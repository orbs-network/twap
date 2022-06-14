// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "../Interfaces.sol";
import "../DOTC.sol";

import "hardhat/console.sol";

contract MockVault {
    DOTC public dotc;

    ERC20 public srcToken;
    ERC20 public dstToken;

    constructor(
        address _dotc,
        address _srcToken,
        address _dstToken
    ) {
        dotc = DOTC(_dotc);
        srcToken = ERC20(_srcToken);
        dstToken = ERC20(_dstToken);
    }

    function doHardWork() external {
        //        dotc.ask(srcToken, dstToken, srcToken.balanceOf(address(this)));
    }
}
