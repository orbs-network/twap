// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../Interfaces.sol";
import "../DOTC.sol";

import "hardhat/console.sol";

contract MockVault is Ownable, IFillCallback {
    struct Filled {
        OrderLib.Order o;
        uint256 srcAmountIn;
        uint256 dstAmountOut;
    }

    DOTC public dotc;

    ERC20 public srcToken;
    ERC20 public dstToken;

    Filled[] public filled;

    constructor(
        address _dotc,
        address _srcToken,
        address _dstToken
    ) {
        dotc = DOTC(_dotc);
        srcToken = ERC20(_srcToken);
        dstToken = ERC20(_dstToken);
    }

    function createAsk(
        uint256 srcAmount,
        uint256 srcBidAmount,
        uint256 dstMinAmount,
        uint256 deadline
    ) external onlyOwner {
        dotc.ask(address(srcToken), address(dstToken), srcAmount, srcBidAmount, dstMinAmount, deadline, address(this));
    }

    function doHardWork() public {
        //
    }

    function onFill(
        OrderLib.Order memory o,
        uint256 srcAmountIn,
        uint256 dstAmountOut
    ) external {
        filled.push(Filled(o, srcAmountIn, dstAmountOut));
        doHardWork();
    }
}
