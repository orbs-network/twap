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

    event OrderCreated(uint256 indexed id, address indexed maker);
    event OrderFilled(
        uint256 indexed id,
        address indexed taker,
        uint256 srcAmountIn,
        uint256 dstAmountOut,
        uint256 fee
    );

    uint256 public constant BIDDING_WINDOW_SECONDS = 10;
    uint256 public constant MINIMUM_DELAY_SECONDS = 60;

    OrderLib.Order[] public book;

    // -------- views --------

    /**
     * Returns Order by order id
     */
    function order(uint256 id) public view returns (OrderLib.Order memory) {
        require(id < length(), "invalid id");
        return book[id];
    }

    /**
     * Returns order book length
     */
    function length() public view returns (uint256) {
        return book.length;
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
        uint256 deadline,
        uint256 delay
    ) external nonReentrant returns (uint256 id) {
        require(delay >= MINIMUM_DELAY_SECONDS, "minimum delay");
        require(
            srcToken != address(0) &&
                dstToken != address(0) &&
                srcToken != dstToken &&
                srcAmount > 0 &&
                srcBidAmount > 0 &&
                srcBidAmount <= srcAmount &&
                dstMinAmount > 0 &&
                deadline > block.timestamp,
            "invalid params"
        );

        OrderLib.Order memory o = OrderLib.newOrder(
            length(),
            exchange,
            srcToken,
            dstToken,
            srcAmount,
            srcBidAmount,
            dstMinAmount,
            deadline,
            delay
        );

        verifyMakerBalance(o);

        book.push(o);
        emit OrderCreated(o.id, o.ask.maker);
        return o.id;
    }

    /**
     * Bid for a specific order by id (msg.sender is taker)
     * A valid bid is higher than current bid, with sufficient price after fees and after last fill delay
     */
    function bid(
        uint256 id,
        address exchange,
        bytes calldata data,
        uint256 fee
    ) external nonReentrant {
        (OrderLib.Order memory o, uint256 dstAmountOut) = verifyBid(id, exchange, data, fee);
        o.bid = OrderLib.Bid(block.timestamp, msg.sender, exchange, data, dstAmountOut, fee);
        book[id] = o;
    }

    /**
     * Fill the current winning bid by the winning taker, if after the bidding window
     * Emits OrderFilled
     */
    function fill(uint256 id) external nonReentrant {
        (OrderLib.Order memory o, uint256 srcAmountIn, uint256 dstAmountOut) = performFill(id);

        emit OrderFilled(id, o.bid.taker, srcAmountIn, dstAmountOut, o.bid.fee);
        o.bid = OrderLib.newBid();
        o.filled.time = block.timestamp;
        o.filled.amount += srcAmountIn;
        book[id] = o;
    }

    /**
     * Cancel order by id
     */
    function cancel(uint256 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(msg.sender == o.ask.maker, "invalid maker");
        o.ask.deadline = 0;
        book[id] = o;
    }

    /**
     * ---- internals ----
     */

    function verifyBid(
        uint256 id,
        address exchange,
        bytes calldata data,
        uint256 fee
    ) private view returns (OrderLib.Order memory o, uint256 dstAmountOut) {
        o = order(id);
        require(block.timestamp < o.ask.deadline, "expired");
        require(block.timestamp > o.filled.time + o.ask.delay, "recently filled");
        require(o.ask.exchange == address(0) || o.ask.exchange == exchange, "invalid exchange");

        dstAmountOut = IExchange(exchange).getAmountOut(o.srcBidAmountNext(), data);
        dstAmountOut -= fee;
        require(dstAmountOut > o.bid.amount, "low bid");
        require(dstAmountOut >= o.dstMinAmountNext(), "insufficient out");
        verifyMakerBalance(o);
    }

    function verifyMakerBalance(OrderLib.Order memory o) private view {
        require(
            ERC20(o.ask.srcToken).allowance(o.ask.maker, address(this)) >= o.srcBidAmountNext(),
            "insufficient maker allowance"
        );
        require(ERC20(o.ask.srcToken).balanceOf(o.ask.maker) >= o.srcBidAmountNext(), "insufficient maker balance");
    }

    function performFill(uint256 id)
        private
        returns (
            OrderLib.Order memory o,
            uint256 srcAmountIn,
            uint256 dstAmountOut
        )
    {
        o = order(id);
        require(msg.sender == o.bid.taker, "invalid taker");
        require(block.timestamp < o.ask.deadline, "expired");
        require(block.timestamp > o.bid.time + BIDDING_WINDOW_SECONDS, "pending bid");

        (srcAmountIn, dstAmountOut) = performFillSwap(o);

        require(dstAmountOut >= o.dstMinAmountNext(), "insufficient out");
    }

    function performFillSwap(OrderLib.Order memory o) private returns (uint256 srcAmountIn, uint256 dstAmountOut) {
        srcAmountIn = o.srcBidAmountNext();
        ERC20(o.ask.srcToken).safeTransferFrom(o.ask.maker, address(this), srcAmountIn);
        ERC20(o.ask.srcToken).safeIncreaseAllowance(o.bid.exchange, srcAmountIn);

        dstAmountOut = IExchange(o.bid.exchange).swap(srcAmountIn, o.dstMinAmountNext(), o.bid.data);

        dstAmountOut -= o.bid.fee;
        ERC20(o.ask.dstToken).safeTransfer(o.bid.taker, o.bid.fee);
        ERC20(o.ask.dstToken).safeTransfer(o.ask.maker, dstAmountOut);
    }
}
