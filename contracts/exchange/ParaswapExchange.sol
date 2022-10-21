// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";
import "./IParaswap.sol";

/**
 * Adapter between IParaswap and TWAP's IExchange interface
 */
contract ParaswapExchange is IExchange {
    using SafeERC20 for ERC20;

    IParaswap public immutable paraswap;

    constructor(address _paraswap) {
        paraswap = IParaswap(_paraswap);
    }

    /**
     * data = amountOut, swap data from paraswap api
     */
    function getAmountOut(
        address,
        address,
        uint256,
        bytes calldata data
    ) public pure returns (uint256 dstAmountOut) {
        (dstAmountOut, ) = decode(data);
    }

    /**
     * data = amountOut, swap data from paraswap api
     */
    function swap(
        address _srcToken,
        address _dstToken,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata data
    ) public {
        (, bytes memory swapdata) = decode(data);
        ERC20 srcToken = ERC20(_srcToken);
        ERC20 dstToken = ERC20(_dstToken);

        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = srcToken.balanceOf(address(this)); // support FoT tokens

        srcToken.safeIncreaseAllowance(paraswap.getTokenTransferProxy(), amountIn);
        Address.functionCall(address(paraswap), swapdata);

        uint256 balance = dstToken.balanceOf(address(this));
        require(balance >= amountOutMin, "PE1");
        dstToken.safeTransfer(msg.sender, balance);
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }
}
