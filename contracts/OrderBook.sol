// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Interfaces.sol";

import "hardhat/console.sol";

struct Order {
    uint256 id;
    uint256 created;
    uint256 deadline;
    address maker;
    address srcToken;
    address dstToken;
    uint256 srcAmount;
    uint256 srcRate;
    uint256 dstRate;
    uint256 filled;
    address taker;
    uint256 bid;
    uint256 bidTime;
}

contract OrderBook is ReentrancyGuard {
    using SafeERC20 for ERC20;

    event OrderCreated(uint256 indexed id, address indexed maker);
    event OrderFilled(uint256 indexed id, address indexed taker, uint256 srcAmount, uint256 dstAmount);

    uint256 public constant BID_DURATION_SEC = 10;

    Order[] public book;

    function order(uint256 id) public view returns (Order memory) {
        return book[id];
    }

    function length() public view returns (uint256) {
        return book.length;
    }

    // 1. user registers a new order
    function ask(
        address srcToken,
        address dstToken,
        uint256 srcAmount,
        uint256 srcRate,
        uint256 dstRate,
        uint256 deadline
    ) external nonReentrant returns (uint256 id) {
        Order memory o = Order(
            length(),
            block.timestamp,
            deadline,
            msg.sender,
            srcToken,
            dstToken,
            srcAmount,
            srcRate,
            dstRate,
            0,
            address(0),
            0,
            0
        );
        book.push(o);
        emit OrderCreated(o.id, o.maker);
        return o.id;
    }

    // 2. keeper offers matching bid, only if higher than current bid
    function bid(uint256 id, uint256 amount) external nonReentrant {
        require(length() > id, "invalid id");
        Order memory o = book[id];
        require(amount > o.bid, "low bid");
        require(block.timestamp < o.deadline, "expired");

        uint256 dstRate = Math.min(o.dstRate, (o.dstRate * (o.srcAmount - o.filled)) / o.srcRate);
        require(amount >= dstRate, "low rate");

        o.taker = msg.sender;
        o.bid = amount;
        o.bidTime = block.timestamp;
        book[id] = o;
    }

    // 3. winning bid is executed by the winning bidder, srcToken is flashloaned from user then amount is returned to user
    function execute(uint256 id, bytes calldata callbackData) external nonReentrant {
        require(length() > id, "invalid id");
        Order memory o = book[id];
        require(msg.sender == o.taker, "invalid taker");
        require(block.timestamp > o.bidTime + BID_DURATION_SEC, "pending bid");
        require(block.timestamp < o.deadline, "expired");

        uint256 amount = Math.min(o.srcRate, o.srcAmount - o.filled);

        ERC20(o.srcToken).safeTransferFrom(o.maker, o.taker, amount);
        Address.functionCall(msg.sender, callbackData);
        ERC20(o.dstToken).safeTransferFrom(o.taker, o.maker, o.bid);

        emit OrderFilled(id, o.taker, amount, o.bid);
        o.filled += amount;
        o.taker = address(0);
        o.bid = 0;
        o.bidTime = 0;
        book[id] = o;
    }
}
