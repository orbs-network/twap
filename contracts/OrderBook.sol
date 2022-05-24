// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Interfaces.sol";

import "hardhat/console.sol";

struct Order {
    uint256 id;
    uint256 createdAt;
    uint256 expiresAt;
    address maker;
    address fromToken;
    address toToken;
    uint256 fromAmount;
    uint256 minToAmount;
    address taker;
    uint256 bid;
}

contract OrderBook is ReentrancyGuard {
    using SafeERC20 for ERC20;

    uint256 public constant BID_DURATION_SEC = 60;

    Order[] public book;

    // 1. user registers a new order
    function ask(
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 minToAmount,
        uint256 expiresAt
    ) external returns (uint256 id) {
        Order memory o = Order(length(), block.timestamp, expiresAt, msg.sender, fromToken, toToken, fromAmount, minToAmount, address(0), 0);
        book.push(o);
        return o.id;
    }

    // 2. keeper offers matching bid, only if higher than current bid
    function bid(uint256 id, uint256 amount) external {
        Order memory o = book[id];
        require(amount > o.bid && amount >= o.minToAmount, "low bid");
        require(block.timestamp < o.expiresAt, "expired");
        o.taker = msg.sender;
        o.bid = amount;
        book[id] = o;
    }

    // 3. winning bid is executed by the winning bidder, fromToken is flashloaned from user then amount is returned to user
    function execute(uint256 id, bytes calldata callbackData) external nonReentrant {
        require(length() > id, "invalid index");
        Order memory o = book[id];
        require(msg.sender == o.taker, "different taker");
        require(block.timestamp < o.expiresAt, "expired");

        ERC20(o.fromToken).safeTransferFrom(o.maker, o.taker, o.fromAmount);
        Address.functionCall(msg.sender, callbackData);
        ERC20(o.toToken).safeTransferFrom(o.taker, o.maker, o.bid);
    }

    function order(uint256 id) public view returns (Order memory) {
        return book[id];
    }

    function length() public view returns (uint256) {
        return book.length;
    }
}
