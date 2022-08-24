// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./OrderLib.sol";
import "./IExchange.sol";

/**
 * Time-Weighted Average Price
 *
 * This contract allows incentivized execution of a TWAP order: Limit or Market Orders
 * on any DEX, with partial fills, by breaking the order into "chunks" and enabling an English Auction bidding war on each chunk.
 *
 * Users (makers) create orders that wait in the contract to be filled.
 *
 * The winning taker (bidder, anyone willing to find the best path to trade for the next chunk on any DEX) receives a portion of the output tokens for their effort.
 *
 * 1 honest taker (willing to take just enough to cover gas costs) is enough to ensure the entire system functions effectively at spot prices.
 *
 * The TWAP contract does not hold any funds, has no owners or other roles and is immutable.
 *
 * The contract works only up to year 2106 (32bit timestamps).
 *
 */
contract TWAP is ReentrancyGuard {
    using SafeERC20 for ERC20;
    using Address for address;
    using OrderLib for OrderLib.Order;

    event OrderCreated(address indexed maker, uint64 indexed id, address indexed exchange, OrderLib.Ask ask);
    event OrderBid(address indexed taker, uint64 indexed id, address indexed exchange, OrderLib.Bid bid);
    event OrderFilled(
        address indexed taker,
        uint64 indexed id,
        address indexed exchange,
        address srcToken,
        address dstToken,
        uint256 srcAmountIn,
        uint256 dstAmountOut,
        uint256 dstFee,
        uint32 filledTime,
        uint256 srcFilledAmount
    );
    event OrderCompleted(address indexed taker, uint64 indexed id);
    event OrderCanceled(address indexed sender, uint64 indexed id);

    uint32 public constant MIN_BID_WINDOW_SECONDS = 10;
    uint32 public constant MAX_BID_WINDOW_SECONDS = 60;
    uint32 public constant MIN_FILL_DELAY_SECONDS = 60;

    uint32 public constant STATUS_CANCELED = 1;
    uint32 public constant STATUS_COMPLETED = 2;

    OrderLib.Order[] public book;
    uint32[] public status; // STATUS or deadline timestamp by order id, used for efficient order filtering

    // -------- views --------

    /**
     * returns Order by order id
     */
    function order(uint64 id) public view returns (OrderLib.Order memory) {
        require(id < length(), "invalid id");
        return book[id];
    }

    /**
     * returns order book length
     */
    function length() public view returns (uint64) {
        return uint64(book.length);
    }

    // -------- actions --------

    /**
     * Create Order by msg.sender (maker)
     * exchange: when 0 address order can be swapped on any exchange, otherwise only that specific exchange
     * srcToken: swap from token
     * dstToken: swap to token
     * srcAmount: total order amount in srcToken
     * srcBidAmount: chunk size in srcToken
     * dstMinAmount: minimum amount out per chunk in dstToken
     * deadline: order expiration
     * delay: minimum seconds between chunk fills
     * returns order id, emits OrderCreated
     */
    function ask(
        address exchange,
        address srcToken,
        address dstToken,
        uint256 srcAmount,
        uint256 srcBidAmount,
        uint256 dstMinAmount,
        uint32 deadline,
        uint32 delay
    ) external nonReentrant returns (uint64 id) {
        require(
            srcToken != address(0) &&
                dstToken != address(0) &&
                srcToken != dstToken &&
                srcAmount > 0 &&
                srcBidAmount > 0 &&
                srcBidAmount <= srcAmount &&
                dstMinAmount > 0 &&
                deadline > block.timestamp &&
                delay >= MIN_FILL_DELAY_SECONDS,
            "params"
        );

        OrderLib.Order memory o = OrderLib.newOrder(
            length(),
            deadline,
            delay,
            exchange,
            srcToken,
            dstToken,
            srcAmount,
            srcBidAmount,
            dstMinAmount
        );

        verifyMakerBalance(o);

        book.push(o);
        status.push(deadline);
        emit OrderCreated(msg.sender, o.id, exchange, o.ask);
        return o.id;
    }

    /**
     * Bid for a specific order by id (msg.sender is taker)
     * A valid bid is higher than current bid, with sufficient price after fees and after last fill delay. Invalid bids are reverted.
     * id: order id
     * exchange: bid to swap on exchange
     * dstFee: fee to traker in dstToken, taken from the swapped amount
     * data: swap data to pass to the exchange, for example the route path
     * emits OrderBid event
     */
    function bid(
        uint64 id,
        address exchange,
        uint256 dstFee,
        bytes calldata data
    ) external nonReentrant {
        OrderLib.Order memory o = order(id);
        uint256 dstAmountOut = verifyBid(o, exchange, dstFee, data);
        o.newBid(exchange, dstAmountOut, dstFee, data);
        book[id] = o;
        emit OrderBid(msg.sender, o.id, exchange, o.bid);
    }

    /**
     * Fill the current winning bid by the winning taker, if after the bidding window. Invalid fills are reverted.
     * id: order id
     * emits OrderFilled, if order is fully filled emits OrderCompleted and status is updated
     */
    function fill(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);

        (address exchange, uint256 srcAmountIn, uint256 dstAmountOut, uint256 dstFee) = performFill(o);
        o.filled(srcAmountIn);

        emit OrderFilled(
            msg.sender,
            id,
            exchange,
            o.ask.srcToken,
            o.ask.dstToken,
            srcAmountIn,
            dstAmountOut,
            dstFee,
            o.filledTime,
            o.srcFilledAmount
        );

        if (o.srcBidAmountNext() == 0) {
            status[id] = STATUS_COMPLETED;
            o.status = STATUS_COMPLETED;
            emit OrderCompleted(msg.sender, id);
        }
        book[id] = o;
    }

    /**
     * Cancel order by id, only callable by maker
     * id: order id
     * emits OrderCanceled
     */
    function cancel(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(msg.sender == o.ask.maker, "maker");
        status[id] = STATUS_CANCELED;
        o.status = STATUS_CANCELED;
        book[id] = o;
        emit OrderCanceled(msg.sender, id);
    }

    /**
     * Called by anyone to mark a stale invalid order as canceled
     * id: order id
     * emits OrderCanceled
     */
    function prune(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        if (
            block.timestamp < o.status &&
            block.timestamp > o.filledTime + o.ask.delay &&
            (ERC20(o.ask.srcToken).allowance(o.ask.maker, address(this)) < o.srcBidAmountNext() ||
                ERC20(o.ask.srcToken).balanceOf(o.ask.maker) < o.srcBidAmountNext())
        ) {
            status[id] = STATUS_CANCELED;
            o.status = STATUS_CANCELED;
            book[id] = o;
            emit OrderCanceled(msg.sender, id);
        }
    }

    /**
     * ---- internals ----
     */

    function verifyBid(
        OrderLib.Order memory o,
        address exchange,
        uint256 dstFee,
        bytes calldata data
    ) private view returns (uint256 dstAmountOut) {
        require(block.timestamp < o.status, "status"); // deadline, canceled or completed
        require(block.timestamp > o.filledTime + o.ask.delay, "delay");
        require(o.ask.exchange == address(0) || o.ask.exchange == exchange, "exchange");

        dstAmountOut = IExchange(exchange).getAmountOut(o.srcBidAmountNext(), data);
        dstAmountOut -= dstFee;

        bool staleBid = block.timestamp > o.bid.time + MAX_BID_WINDOW_SECONDS;
        require(staleBid || dstAmountOut > o.bid.dstAmount, "low bid");
        require(dstAmountOut >= o.dstMinAmountNext(), "min out");
        verifyMakerBalance(o);
    }

    function verifyMakerBalance(OrderLib.Order memory o) private view {
        uint256 bidAmount = o.srcBidAmountNext();
        require(ERC20(o.ask.srcToken).allowance(o.ask.maker, address(this)) >= bidAmount, "maker allowance");
        require(ERC20(o.ask.srcToken).balanceOf(o.ask.maker) >= bidAmount, "maker balance");
    }

    function performFill(OrderLib.Order memory o)
        private
        returns (
            address exchange,
            uint256 srcAmountIn,
            uint256 dstAmountOut,
            uint256 dstFee
        )
    {
        require(msg.sender == o.bid.taker, "taker");
        require(block.timestamp < o.status, "status"); // deadline, canceled or completed
        require(block.timestamp > o.bid.time + MIN_BID_WINDOW_SECONDS, "pending bid");

        exchange = o.bid.exchange;
        dstFee = o.bid.dstFee;
        srcAmountIn = o.srcBidAmountNext();
        ERC20(o.ask.srcToken).safeTransferFrom(o.ask.maker, address(this), srcAmountIn);
        ERC20(o.ask.srcToken).safeIncreaseAllowance(exchange, srcAmountIn);

        uint256 expectedOut = o.dstMinAmountNext();
        dstAmountOut = IExchange(exchange).swap(srcAmountIn, expectedOut + dstFee, o.bid.data);
        dstAmountOut -= dstFee;
        require(dstAmountOut >= expectedOut, "min out");

        ERC20(o.ask.dstToken).safeTransfer(o.bid.taker, dstFee);
        ERC20(o.ask.dstToken).safeTransfer(o.ask.maker, dstAmountOut);
    }
}
