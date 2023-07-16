// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import {OrderLib} from "./OrderLib.sol";
import {IExchange} from "./IExchange.sol";
import {IWETH} from "./IWETH.sol";

/**
 * ---------------------------
 * Time-Weighted Average Price
 * ---------------------------
 *
 * https://github.com/orbs-network/twap
 *
 * This smart contract allows the incentivized execution of a TWAP order (either a Limit Order or a Market Order) on any DEX, with the possibility of partial fills.
 *
 * A TWAP order breaks a larger order down into smaller trades or "chunks", which are executed over a set period of time.
 * This is a common strategy in traditional finance but it was not previously possible to execute such trades in a decentralized manner in DeFi systems.
 *
 * In this smart contract, users (makers) create orders that wait in the contract to be filled. Once made, these orders enable an English Auction bidding war on each chunk at its time interval.
 * Anyone willing to participate can serve as a “taker” by finding the best path to fill the order for the next chunk on any DEX,
 * within the parameters set by the maker. Takers submit these paths as a bid to the contract, which selects the winner based on criteria described in detail below.
 *
 * The winning taker receives a portion of the output tokens as a reward for their effort.
 *
 * One honest taker (i.e., a taker who is willing to set the fee at the minimum amount needed to cover gas costs)
 * is enough to ensure the entire system functions effectively at spot prices.
 *
 * The contract is set to operate only up to the year 2106 (32bit timestamps), at which point it will no longer be usable.
 *
 * The TWAP Smart Contract does not hold any funds, has no owners, administrators, or other roles and is entirely immutable once deployed on an EVM blockchain.
 *
 */
contract TWAP is ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Address for address;
    using OrderLib for OrderLib.Order;

    uint8 public constant VERSION = 5;

    event OrderCreated(uint64 indexed id, address indexed maker, address indexed exchange, OrderLib.Ask ask);
    event OrderBid(
        uint64 indexed id,
        address indexed maker,
        address indexed exchange,
        uint32 slippagePercent,
        OrderLib.Bid bid
    );
    event OrderFilled(
        uint64 indexed id,
        address indexed maker,
        address indexed exchange,
        address taker,
        uint32 count,
        uint256 dstAmount,
        uint256 dstFee
    );
    event OrderCompleted(uint64 indexed id, address indexed maker, address indexed exchange, address taker);
    event OrderCanceled(uint64 indexed id, address indexed maker, address sender);

    uint32 public constant PERCENT_BASE = 100_000;
    uint32 public constant MIN_OUTBID_PERCENT = 101_000;
    uint32 public constant STALE_BID_SECONDS = 10 minutes;
    uint32 public constant MIN_BID_DELAY_SECONDS = 30 seconds;

    uint32 public constant STATUS_CANCELED = 1;
    uint32 public constant STATUS_COMPLETED = 2;

    OrderLib.Order[] public book;
    uint32[] public status; // STATUS or deadline timestamp by order id, used for gas efficient order filtering
    mapping(address => uint64[]) public _makerOrders;

    address public immutable iweth;

    constructor(address _iweth) {
        iweth = _iweth;
    }

    // -------- views --------

    /**
     * returns Order by order id
     */
    function order(uint64 id) public view returns (OrderLib.Order memory) {
        require(id < length(), "TWAP:order:id");
        return book[id];
    }

    /**
     * returns order book length
     */
    function length() public view returns (uint64) {
        return uint64(book.length);
    }

    /**
     * returns order ids by maker
     */
    function makerOrders(address maker) external view returns (uint64[] memory) {
        return _makerOrders[maker];
    }

    /**
     * returns the dstAmountOut for the next chunk of the order, without any onchain side effects other than spent gas, by executing the swap on the exchange, with data as bid, then reverting.
     * marked as non-view to allow to temporarily execute swap and revert.
     * on successful swap returns the dstAmountOut but reverts the actual swap and other side effects.
     * this does not attempt to handle MEV or protect against any other exchange manipulations.
     */
    function simulateAmountOut(uint64 id, address exchange, bytes calldata data) public returns (uint256 dstAmountOut) {
        (bool success, bytes memory returndata) = address(this).delegatecall( // solhint-disable-line avoid-low-level-calls
            abi.encodeWithSelector(this._simulateSwapAndRevert.selector, id, exchange, data)
        );
        require(!success, string(returndata));
        bytes32 h;
        (dstAmountOut, h) = abi.decode(returndata, (uint256, bytes32));
        require(h == keccak256(abi.encode(dstAmountOut)), "TWAP:getAmountOut:simulate");
    }

    // -------- actions --------

    /**
     * Create Order by msg.sender (maker)
     *
     * returns order id, emits OrderCreated
     */
    function ask(OrderLib.Ask calldata a) external nonReentrant returns (uint64 id) {
        require(
            a.srcToken != address(0) &&
                a.srcToken != a.dstToken &&
                (a.srcToken != iweth || a.dstToken != address(0)) &&
                a.srcBidAmount > 0 &&
                a.dstMinAmount > 0 &&
                a.count > 0 &&
                a.deadline > block.timestamp &&
                a.bidDelay >= MIN_BID_DELAY_SECONDS,
            "TWAP:ask:params"
        );

        OrderLib.Order memory o = OrderLib.newOrder(length(), a);
        require(o.hasAllowance(address(this)), "TWAP:ask:allowance");

        book.push(o);
        status.push(o.status);
        _makerOrders[msg.sender].push(o.id);

        emit OrderCreated(o.id, o.maker, o.ask.exchange, o.ask);
        return o.id;
    }

    /**
     * Bid for a specific order by id (msg.sender is taker)
     * A valid bid is higher than current bid (current bid is stale), with sufficient price after fees and after last fill delay. Invalid bids are reverted.
     * No token transfers or swaps are performed.
     * id: order id
     * exchange: bid to swap on exchange
     * dstFee: fee to traker in dstToken, taken from the swapped amount
     * slippagePercent: price output difference tolerance percent / 100,000. 0 means no slippage
     * data: swap data to pass to the exchange, for example the route path
     * emits OrderBid event
     */
    function bid(
        uint64 id,
        address exchange,
        uint256 dstFee,
        uint32 slippagePercent,
        bytes calldata data
    ) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(block.timestamp < o.status, "TWAP:bid:status");
        require(block.timestamp > o.filled.time + o.ask.fillDelay, "TWAP:bid:fillDelay");

        if (!o.hasAllowance(address(this))) return _cancel(id);

        require(exchange != address(0) && slippagePercent < PERCENT_BASE, "TWAP:bid:params");
        require(o.ask.exchange == address(0) || o.ask.exchange == exchange, "TWAP:bid:exchange");

        uint256 dstAmountOut = simulateAmountOut(id, exchange, data);

        dstAmountOut -= (dstAmountOut * slippagePercent) / PERCENT_BASE;
        dstAmountOut -= dstFee;
        require(dstAmountOut >= o.ask.dstMinAmount, "TWAP:bid:dstMinAmount");
        require(
            dstAmountOut > (o.bid.dstAmount * MIN_OUTBID_PERCENT) / PERCENT_BASE || // outbid by more than MIN_OUTBID_PERCENT
                block.timestamp > o.bid.time + STALE_BID_SECONDS, // or stale bid
            "TWAP:bid:lowBid"
        );

        o.newBid(exchange, dstAmountOut, dstFee, data);
        book[id] = o;
        emit OrderBid(o.id, o.maker, exchange, slippagePercent, o.bid);
    }

    /**
     * Fill the current winning bid by the winning taker, if after the bidding window. Invalid fills are reverted.
     * id: order id
     * emits OrderFilled
     * if order is fully filled emits OrderCompleted and status is updated
     */
    function fill(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(msg.sender == o.bid.taker, "TWAP:fill:taker");
        require(block.timestamp < o.status, "TWAP:fill:status");
        require(block.timestamp > o.bid.time + o.ask.bidDelay, "TWAP:fill:bidDelay");

        uint256 dstFee = o.bid.dstFee;
        address exchange = o.bid.exchange;

        uint256 dstAmount = _swap(id, exchange, o.bid.data, o.bid.dstAmount + dstFee);
        require(dstAmount > dstFee, "TWAP:fill:dstFee"); // redudant, for clarity
        dstAmount -= dstFee;
        require(dstAmount >= o.ask.dstMinAmount, "TWAP:fill:dstMinAmount"); // redudant, for clarity

        if (o.ask.dstToken == address(0)) {
            IWETH(iweth).withdraw(dstAmount + dstFee);
            Address.sendValue(payable(o.bid.taker), dstFee);
            Address.sendValue(payable(o.maker), dstAmount);
        } else {
            IERC20(o.ask.dstToken).safeTransfer(o.bid.taker, dstFee);
            IERC20(o.ask.dstToken).safeTransfer(o.maker, dstAmount);
        }

        // delete bid, count++
        o.newFill(dstAmount);

        emit OrderFilled(id, o.maker, exchange, msg.sender, o.filled.count, dstAmount, dstFee);

        if (o.filled.count == o.ask.count) {
            status[id] = STATUS_COMPLETED;
            o.status = STATUS_COMPLETED;
            emit OrderCompleted(o.id, o.maker, exchange, msg.sender);
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
        require(msg.sender == o.maker, "TWAP:cancel:onlyMaker");
        _cancel(id);
    }

    /**
     * Called by anyone to mark a stale invalid order as canceled
     * id: order id
     * emits OrderCanceled
     */
    function prune(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(block.timestamp < o.status, "TWAP:prune:status");
        require(block.timestamp > o.filled.time + o.ask.fillDelay, "TWAP:prune:fillDelay");
        require(!o.hasAllowance(address(this)), "TWAP:prune:valid");
        _cancel(id);
    }

    /**
     * ---- internals ----
     */

    /**
     * internal function, always reverts.
     * simulates the swap on the exchange and revert with dstAmountOut, without any onchain side effects other than spent gas.
     * marked as public and non-view to allow delegatecall here and mutate state (temporarily).
     * on successful swap reverts with reason as 64 bytes (uint256 dstAmountOut, bytes32 hash).
     * the hash must be checked by the caller to ensure the result is an actual dstAmountOut and not other revert reason data.
     * this does not attempt to handle MEV or protect against any other exchange manipulations.
     */
    function _simulateSwapAndRevert(uint64 id, address exchange, bytes calldata data) public {
        uint256 dstAmountOut = _swap(id, exchange, data, 1);
        // solhint-disable-next-line no-inline-assembly
        assembly {
            let ptr := mload(0x40) // load the free memory pointer
            mstore(ptr, dstAmountOut) // store the value in memory
            mstore(add(ptr, 32), keccak256(ptr, 32)) // concat the hash of the value
            revert(ptr, 64) // revert with the memory data as the message (uint256, bytes32)
        }
    }

    function _swap(
        uint64 id,
        address exchange,
        bytes memory bidData,
        uint256 dstMinAmount
    ) private returns (uint256 dstAmountOut) {
        OrderLib.Order memory o = order(id);
        uint256 srcAmountIn = o.ask.srcBidAmount;
        address dstToken = o.ask.dstToken == address(0) ? iweth : o.ask.dstToken;

        IERC20(o.ask.srcToken).safeTransferFrom(o.maker, address(this), srcAmountIn);
        srcAmountIn = IERC20(o.ask.srcToken).balanceOf(address(this)); // support FoT

        IERC20(o.ask.srcToken).safeIncreaseAllowance(exchange, srcAmountIn);

        IExchange(exchange).swap(o.ask.srcToken, dstToken, srcAmountIn, dstMinAmount, o.ask.data, bidData);

        dstAmountOut = IERC20(dstToken).balanceOf(address(this)); // support FoT
        require(dstAmountOut >= dstMinAmount, "TWAP:swap:dstMinAmount");
    }

    function _cancel(uint64 id) private {
        OrderLib.Order memory o = order(id);
        status[id] = STATUS_CANCELED;
        o.status = STATUS_CANCELED;
        book[id] = o;
        emit OrderCanceled(o.id, o.maker, msg.sender);
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks
}
