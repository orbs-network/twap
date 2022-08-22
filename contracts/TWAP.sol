// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./OrderLib.sol";
import "./IExchange.sol";

contract TWAP is ReentrancyGuard {
    using SafeERC20 for ERC20;
    using Address for address;
    using OrderLib for OrderLib.Order;

    event OrderCreated(address indexed maker, uint64 id);
    event OrderFilled(address indexed taker, uint64 id, uint256 srcAmountIn, uint256 dstAmountOut, uint256 dstFee);

    uint32 public constant MIN_BID_WINDOW_SECONDS = 10;
    uint32 public constant MAX_BID_WINDOW_SECONDS = 60;
    uint32 public constant MIN_FILL_DELAY_SECONDS = 60;

    uint32 public constant STATUS_OPEN = 0;
    uint32 public constant STATUS_CANCELED = 1;
    uint32 public constant STATUS_COMPLETED = 2;

    OrderLib.Order[] public book;
    uint32[] public status; // STATUS or deadline timestamp by order id, used for filtering

    // -------- views --------

    /**
     * Returns Order by order id
     */
    function order(uint64 id) public view returns (OrderLib.Order memory) {
        require(id < length(), "invalid id");
        return book[id];
    }

    /**
     * Returns order book length
     */
    function length() public view returns (uint64) {
        return uint64(book.length);
    }

    // -------- actions --------

    /**
     * Create Order by msg.sender (maker)
     * Returns order id, emits OrderCreated
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
        emit OrderCreated(msg.sender, o.id);
        return o.id;
    }

    /**
     * Bid for a specific order by id (msg.sender is taker)
     * A valid bid is higher than current bid, with sufficient price after fees and after last fill delay
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
    }

    /**
     * Fill the current winning bid by the winning taker, if after the bidding window
     * Emits OrderFilled
     */
    function fill(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        (uint256 srcAmountIn, uint256 dstAmountOut) = performFill(o);
        emit OrderFilled(msg.sender, id, srcAmountIn, dstAmountOut, o.bid.dstFee);

        o.filled(srcAmountIn);
        if (o.srcBidAmountNext() == 0) {
            status[id] = STATUS_COMPLETED;
            o.status = STATUS_COMPLETED;
        }
        book[id] = o;
    }

    /**
     * Cancel order by id
     */
    function cancel(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(msg.sender == o.ask.maker, "invalid maker");
        status[id] = STATUS_CANCELED;
        o.status = STATUS_CANCELED;
        book[id] = o;
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
        require(block.timestamp < status[o.id], "status"); // deadline, canceled or completed
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

    function performFill(OrderLib.Order memory o) private returns (uint256 srcAmountIn, uint256 dstAmountOut) {
        require(msg.sender == o.bid.taker, "taker");
        require(block.timestamp < status[o.id], "status"); // deadline, canceled or completed
        require(block.timestamp > o.bid.time + MIN_BID_WINDOW_SECONDS, "pending bid");

        srcAmountIn = o.srcBidAmountNext();
        ERC20(o.ask.srcToken).safeTransferFrom(o.ask.maker, address(this), srcAmountIn);
        ERC20(o.ask.srcToken).safeIncreaseAllowance(o.bid.exchange, srcAmountIn);

        uint256 expectedOut = o.dstMinAmountNext();
        dstAmountOut = IExchange(o.bid.exchange).swap(srcAmountIn, expectedOut + o.bid.dstFee, o.bid.data);
        dstAmountOut -= o.bid.dstFee;
        require(dstAmountOut >= expectedOut, "min out");

        ERC20(o.ask.dstToken).safeTransfer(o.bid.taker, o.bid.dstFee);
        ERC20(o.ask.dstToken).safeTransfer(o.ask.maker, dstAmountOut);
    }
}
