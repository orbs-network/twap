// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./OrderLib.sol";
import "./IExchange.sol";
import "./IWETH.sol";

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
    using SafeERC20 for ERC20;
    using Address for address;
    using OrderLib for OrderLib.Order;

    uint8 public constant VERSION = 4;

    event OrderCreated(uint64 indexed id, address indexed maker, address indexed exchange, OrderLib.Ask ask);
    event OrderBid(
        uint64 indexed id, address indexed maker, address indexed exchange, uint32 slippagePercent, OrderLib.Bid bid
    );
    event OrderFilled(
        uint64 indexed id,
        address indexed maker,
        address indexed exchange,
        address taker,
        uint256 srcAmountIn,
        uint256 dstAmountOut,
        uint256 dstFee,
        uint256 srcFilledAmount
    );
    event OrderCompleted(uint64 indexed id, address indexed maker, address indexed exchange, address taker);
    event OrderCanceled(uint64 indexed id, address indexed maker, address sender);

    uint32 public constant PERCENT_BASE = 100_000;
    uint32 public constant MIN_OUTBID_PERCENT = 101_000;
    uint32 public constant STALE_BID_SECONDS = 60 * 10;
    uint32 public constant MIN_BID_DELAY_SECONDS = 30;

    uint32 public constant STATUS_CANCELED = 1;
    uint32 public constant STATUS_COMPLETED = 2;

    OrderLib.Order[] public book;
    uint32[] public status; // STATUS or deadline timestamp by order id, used for gas efficient order filtering
    mapping(address => uint64[]) public makerOrders;

    address public immutable iweth;

    constructor(address _iweth) {
        iweth = _iweth;
    }

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

    function orderIdsByMaker(address maker) external view returns (uint64[] memory) {
        return makerOrders[maker];
    }

    // -------- actions --------

    /**
     * Create Order by msg.sender (maker)
     *
     * returns order id, emits OrderCreated
     */
    function ask(OrderLib.Ask calldata _ask) external nonReentrant returns (uint64 id) {
        require(
            _ask.srcToken != address(0) && _ask.srcToken != _ask.dstToken
                && (_ask.srcToken != iweth || _ask.dstToken != address(0)) && _ask.srcAmount > 0 && _ask.srcBidAmount > 0
                && _ask.srcBidAmount <= _ask.srcAmount && _ask.dstMinAmount > 0 && _ask.deadline > block.timestamp
                && _ask.bidDelay >= MIN_BID_DELAY_SECONDS,
            "params"
        );

        OrderLib.Order memory o = OrderLib.newOrder(length(), _ask);
        verifyMakerBalance(o);

        book.push(o);
        status.push(o.status);
        makerOrders[msg.sender].push(o.id);
        emit OrderCreated(o.id, o.maker, o.ask.exchange, o.ask);
        return o.id;
    }

    /**
     * Bid for a specific order by id (msg.sender is taker)
     * A valid bid is higher than current bid, with sufficient price after fees and after last fill delay. Invalid bids are reverted.
     * id: order id
     * exchange: bid to swap on exchange
     * dstFee: fee to traker in dstToken, taken from the swapped amount
     * slippagePercent: price output difference tolerance percent / 100,000. 0 means no slippage
     * data: swap data to pass to the exchange, for example the route path
     * emits OrderBid event
     */
    function bid(uint64 id, address exchange, uint256 dstFee, uint32 slippagePercent, bytes calldata data)
        external
        nonReentrant
    {
        require(exchange != address(0) && slippagePercent < PERCENT_BASE, "params");
        OrderLib.Order memory o = order(id);
        uint256 dstAmountOut = verifyBid(o, exchange, dstFee, slippagePercent, data);
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

        (address exchange, uint256 srcAmountIn, uint256 dstAmountOut, uint256 dstFee) = performFill(o);
        o.filled(srcAmountIn);

        emit OrderFilled(id, o.maker, exchange, msg.sender, srcAmountIn, dstAmountOut, dstFee, o.srcFilledAmount);

        if (o.srcBidAmountNext() == 0) {
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
        require(msg.sender == o.maker, "maker");
        status[id] = STATUS_CANCELED;
        o.status = STATUS_CANCELED;
        book[id] = o;
        emit OrderCanceled(o.id, o.maker, msg.sender);
    }

    /**
     * Called by anyone to mark a stale invalid order as canceled
     * id: order id
     * emits OrderCanceled
     */
    function prune(uint64 id) external nonReentrant {
        OrderLib.Order memory o = order(id);
        require(block.timestamp < o.status, "status");
        require(block.timestamp > o.filledTime + o.ask.fillDelay, "fill delay");
        require(
            ERC20(o.ask.srcToken).allowance(o.maker, address(this)) < o.srcBidAmountNext()
                || ERC20(o.ask.srcToken).balanceOf(o.maker) < o.srcBidAmountNext(),
            "valid"
        );
        status[id] = STATUS_CANCELED;
        o.status = STATUS_CANCELED;
        book[id] = o;
        emit OrderCanceled(o.id, o.maker, msg.sender);
    }

    /**
     * ---- internals ----
     */

    /**
     * verifies the bid against the ask params, reverts on invalid bid.
     * returns dstAmountOut after taker dstFee, which must be higher than any previous bid, unless previous bid is stale
     */
    function verifyBid(
        OrderLib.Order memory o,
        address exchange,
        uint256 dstFee,
        uint32 slippagePercent,
        bytes calldata data
    ) private view returns (uint256 dstAmountOut) {
        require(block.timestamp < o.status, "status"); // deadline, canceled or completed
        require(block.timestamp > o.filledTime + o.ask.fillDelay, "fill delay");
        require(o.ask.exchange == address(0) || o.ask.exchange == exchange, "exchange");

        dstAmountOut = IExchange(exchange).getAmountOut(
            o.ask.srcToken, _dstToken(o), o.srcBidAmountNext(), o.ask.data, data, msg.sender
        );
        dstAmountOut -= (dstAmountOut * slippagePercent) / PERCENT_BASE;
        dstAmountOut -= dstFee;

        require(
            dstAmountOut > (o.bid.dstAmount * MIN_OUTBID_PERCENT) / PERCENT_BASE // outbid by more than MIN_OUTBID_PERCENT
                || block.timestamp > o.bid.time + STALE_BID_SECONDS, // or stale bid
            "low bid"
        );
        require(dstAmountOut >= o.dstMinAmountNext(), "min out");
        verifyMakerBalance(o);
    }

    /**
     * executes the winning bid. reverts if bid no longer valid.
     * transfers next chunk srcToken amount from maker, swaps via bid exchange with bid data, transfers dstFee to taker (msg.sender) and
     * transfers all other dstToken amount to maker
     */
    function performFill(OrderLib.Order memory o)
        private
        returns (address exchange, uint256 srcAmountIn, uint256 dstAmountOut, uint256 dstFee)
    {
        require(msg.sender == o.bid.taker, "taker");
        require(block.timestamp < o.status, "status"); // deadline, canceled or completed
        require(block.timestamp > o.bid.time + o.ask.bidDelay, "bid delay");

        exchange = o.bid.exchange;
        dstFee = o.bid.dstFee;
        srcAmountIn = o.srcBidAmountNext();
        uint256 minOut = o.dstExpectedOutNext();

        ERC20(o.ask.srcToken).safeTransferFrom(o.maker, address(this), srcAmountIn);
        srcAmountIn = ERC20(o.ask.srcToken).balanceOf(address(this)); // support FoT tokens
        ERC20(o.ask.srcToken).safeIncreaseAllowance(exchange, srcAmountIn);

        IExchange(exchange).swap(
            o.ask.srcToken, _dstToken(o), srcAmountIn, minOut + dstFee, o.ask.data, o.bid.data, msg.sender
        );

        dstAmountOut = ERC20(_dstToken(o)).balanceOf(address(this)); // support FoT tokens
        dstAmountOut -= dstFee;
        require(dstAmountOut >= minOut, "min out");

        if (o.ask.dstToken == address(0)) {
            IWETH(iweth).withdraw(ERC20(iweth).balanceOf(address(this)));
            Address.sendValue(payable(o.bid.taker), dstFee);
            Address.sendValue(payable(o.maker), dstAmountOut);
        } else {
            ERC20(_dstToken(o)).safeTransfer(o.bid.taker, dstFee);
            ERC20(_dstToken(o)).safeTransfer(o.maker, dstAmountOut);
        }
    }

    /**
     * reverts if maker does not hold enough balance srcToken or allowance to be spent here for the next chunk
     */
    function verifyMakerBalance(OrderLib.Order memory o) private view {
        require(ERC20(o.ask.srcToken).allowance(o.maker, address(this)) >= o.srcBidAmountNext(), "maker allowance");
        require(ERC20(o.ask.srcToken).balanceOf(o.maker) >= o.srcBidAmountNext(), "maker balance");
    }

    function _dstToken(OrderLib.Order memory o) private view returns (address) {
        return o.ask.dstToken == address(0) ? iweth : o.ask.dstToken;
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks
}
