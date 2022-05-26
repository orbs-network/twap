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

    function bid(uint256 id, uint256 amount) external onlyOwner {
        ORDER_BOOK.bid(id, amount);
    }

    function execute(uint256 id) external onlyOwner {
        ORDER_BOOK.execute(id, abi.encodeWithSelector(this.executeSwapCallback.selector, id));
    }

    /**
     * executes the swap, in this simple case just pull the token from owner (assumes for example owner does arb with cefi)
     */
    function executeSwapCallback(uint256 id) external {
        // TODO access
        Order memory o = ORDER_BOOK.order(id);
        ERC20(o.dstToken).safeTransferFrom(owner(), address(this), o.bid);
        ERC20(o.dstToken).safeIncreaseAllowance(address(ORDER_BOOK), o.bid);
    }
}
