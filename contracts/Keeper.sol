// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./OrderBook.sol";
import "./Interfaces.sol";

import "hardhat/console.sol";

contract Keeper is Ownable {
    using SafeERC20 for ERC20;

    OrderBook public immutable ORDER_BOOK;

    constructor(address owner, address orderBook) {
        ORDER_BOOK = OrderBook(orderBook);
        transferOwnership(owner);
    }

    function bid(uint256 index, Bid calldata b) external onlyOwner {
        ORDER_BOOK.bid(index, b);
    }

    function execute(uint256 index) external onlyOwner {
        ORDER_BOOK.execute(index, abi.encodeWithSelector(this.executeSwapCallback.selector, index));
    }

    function executeSwapCallback(uint256 index) external {
        // TODO access
        Order memory o = ORDER_BOOK.order(index);
        ERC20(o.bid.toToken).safeTransferFrom(owner(), address(this), o.bid.amount);
        ERC20(o.bid.toToken).safeIncreaseAllowance(address(ORDER_BOOK), o.bid.amount);
    }
}
