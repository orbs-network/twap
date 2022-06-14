// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Interfaces.sol";
import "./OrderLib.sol";

contract DOTC is ReentrancyGuard {
    using SafeERC20 for ERC20;
    using OrderLib for OrderLib.Order;

    event OrderCreated(uint256 indexed id, address indexed maker);
    event OrderFilled(uint256 indexed id, address indexed taker, uint256 srcAmount, uint256 dstAmount);

    uint256 public constant BID_WINDOW_MIN_SEC = 10;
    uint256 public constant BID_WINDOW_MAX_SEC = 60;
    uint256 public constant FILL_DELAY_SEC = 60;

    OrderLib.Order[] public book;

    /**
     * ---- views ----
     */

    function order(uint256 id) public view returns (OrderLib.Order memory) {
        require(id < length(), "invalid id");
        return book[id];
    }

    function length() public view returns (uint256) {
        return book.length;
    }

    function verifyBid(
        uint256 id,
        address exchange,
        address[] calldata path
    ) public view returns (OrderLib.Order memory o, uint256 amountOut) {
        o = order(id);
        require(block.timestamp < o.ask.deadline, "expired");

        amountOut = IExchange(exchange).getAmountOut(o.ask.srcBidAmount, path);
        require(amountOut > o.ask.dstMinAmount, "low rate");
        require(amountOut > o.bid.amount, "low bid");

        require(block.timestamp > o.filled.time + FILL_DELAY_SEC, "recently filled");
        //
        //        uint256 dstMinAmount = Math.min(o.dstMinAmount, (o.dstMinAmount * (o.srcAmount - o.filled)) / o.srcBidAmount);
        //        require(amount >= dstMinAmount, "low rate");
    }

    function verifyFill(uint256 id) public view returns (OrderLib.Order memory o, uint256 amountOut) {
        o = order(id);
        //        require(msg.sender == o.taker, "invalid taker");
        //        require(block.timestamp < o.deadline, "expired");
        //        require(
        //            block.timestamp > o.bidTime + BID_WINDOW_MIN_SEC || block.timestamp > o.filledTime + BID_WINDOW_MAX_SEC,
        //            "pending bid"
        //        );
        //
        //        amount = Math.min(o.srcBidAmount, o.srcAmount - o.filled);

        amountOut = IExchange(o.bid.exchange).getAmountOut(o.ask.srcBidAmount, o.bid.path);
    }

    /**
     * ---- actions ----
     */

    // 1. maker creates order
    function ask(
        address srcToken,
        address dstToken,
        uint256 srcAmount,
        uint256 srcBidAmount,
        uint256 dstMinAmount,
        uint256 deadline
    ) external nonReentrant returns (uint256 id) {
        OrderLib.Order memory o = OrderLib.createOrder(
            length(),
            srcToken,
            dstToken,
            srcAmount,
            srcBidAmount,
            dstMinAmount,
            deadline
        );
        book.push(o);
        emit OrderCreated(o.id, o.ask.maker);
        return o.id;
    }

    // 2. taker offers matching bid, only if higher than current bid, sufficient rate, and after last filled delay
    function bid(
        uint256 id,
        address exchange,
        address[] calldata path
    ) external nonReentrant {
        (OrderLib.Order memory o, uint256 amountOut) = verifyBid(id, exchange, path);
        o.bid.time = block.timestamp;
        o.bid.taker = msg.sender;
        o.bid.exchange = exchange;
        o.bid.path = path;
        o.bid.amount = amountOut;
        book[id] = o;
    }

    // 3. winning bid is executed by the taker, only if after bidding window
    function fill(uint256 id) external nonReentrant {
        (OrderLib.Order memory o, uint256 amountOut) = verifyFill(id);
        //        {
        //            ERC20(o.srcToken).safeTransferFrom(o.maker, o.taker, amount);
        //            IBidder bidder = IBidder(msg.sender);
        //            Address.functionCall(msg.sender, abi.encodeWithSelector(bidder.executeCallback.selector, id, data));
        //            ERC20(o.dstToken).safeTransferFrom(o.taker, o.maker, o.bid);
        //            // TODO user callback
        //        }
        //        emit OrderFilled(id, o.taker, amount, o.bid);
        o.filled.time = block.timestamp;
        o.filled.amount += o.ask.srcBidAmount;
        o.clearBid();
        book[id] = o;
    }
}
