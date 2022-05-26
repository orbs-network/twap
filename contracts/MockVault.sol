// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Interfaces.sol";
import "./OrderBook.sol";

import "hardhat/console.sol";

contract MockVault {
    OrderBook public orderbook;

    ERC20 public srcToken;
    ERC20 public dstToken;

    constructor(
        address _orderbook,
        address _srcToken,
        address _dstToken
    ) {
        orderbook = OrderBook(_orderbook);
        srcToken = ERC20(_srcToken);
        dstToken = ERC20(_dstToken);
    }

    function doHardWork() external {
        //        orderbook.ask(srcToken, dstToken, srcToken.balanceOf(address(this)));
    }
}
