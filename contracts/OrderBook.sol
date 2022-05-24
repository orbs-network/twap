// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Interfaces.sol";

import "hardhat/console.sol";

struct Ask {
    address sender;
    address fromToken;
    address toToken;
    uint256 fromAmount;
    uint256 minToAmount;
    uint256 expiresAt;
}

struct Bid {
    address sender;
    address fromToken;
    address toToken;
    uint256 amount;
}

struct Order {
    uint256 createdAt;
    Ask ask;
    Bid bid;
}

contract OrderBook is ReentrancyGuard {
    using SafeERC20 for ERC20;

    uint256 public constant BID_DURATION_SEC = 60;

    Order[] public book;

    // 1. user registers a new order
    function ask(Ask calldata a) external returns (uint256 index) {
        require(msg.sender == a.sender, "E5");
        book.push(Order(block.timestamp, a, Bid(address(0), address(0), address(0), 0)));
        return length() - 1;
    }

    // 2. keeper offers matching bid, only if higher than current bid
    function bid(uint256 index, Bid calldata b) external {
        require(msg.sender == b.sender, "E8");
        Order memory o = book[index];
        verifyMatch(o.ask, b);
        require(o.bid.amount < b.amount, "E4");
        o.bid = b;
        book[index] = o;
    }

    // 3. winning bid is executed by the winning bidder, fromToken is flashloaned from user then amount is returned to user
    function execute(uint256 index, bytes calldata callbackSig) external nonReentrant {
        require(length() > index, "E6");
        Order memory o = book[index];
        require(msg.sender == o.bid.sender, "E7");
        verifyMatch(o.ask, o.bid);

        ERC20(o.ask.fromToken).safeTransferFrom(o.ask.sender, o.bid.sender, o.ask.fromAmount); // ERC20 verifies address(this) allowance
        Address.functionCall(msg.sender, callbackSig); // flashloan fromAmount of fromToken to bidder
        console.log("----------------------------------");
        console.log("o.bid.sender", o.bid.sender);
        console.log("o.ask.sender", o.ask.sender);
        console.log("o.bid.amount", o.bid.amount);
        ERC20(o.ask.toToken).safeTransferFrom(o.bid.sender, o.ask.sender, o.bid.amount); // ERC20 verifies address(this) allowance
    }

    function verifyMatch(Ask memory a, Bid memory b) internal view {
        require(a.fromToken == b.fromToken && a.toToken == b.toToken, "E1");
        require(b.amount >= a.minToAmount, "E2");
        require(a.expiresAt > block.timestamp, "E3");
    }

    function order(uint256 index) public view returns (Order memory) {
        return book[index];
    }

    function length() public view returns (uint256) {
        return book.length;
    }
}
