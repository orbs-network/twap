// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IExchange} from "../IExchange.sol";

/**
 * Adapter between IParaswap and TWAP's IExchange interface
 */
contract ParaswapExchange is IExchange {
    using SafeERC20 for IERC20;

    IParaswap public immutable paraswap;

    constructor(address _paraswap) {
        paraswap = IParaswap(_paraswap);
    }

    /**
     * bidData: swap data from paraswap api
     */
    function swap(
        address srcToken,
        address dstToken,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata,
        bytes calldata bidData
    ) public {
        IERC20(srcToken).safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = IERC20(srcToken).balanceOf(address(this)); // support FoT tokens

        IERC20(srcToken).safeIncreaseAllowance(paraswap.getTokenTransferProxy(), amountIn);
        Address.functionCall(address(paraswap), bidData);

        uint256 balance = IERC20(dstToken).balanceOf(address(this));
        require(balance >= amountOutMin, "ParaswapExchange:amountOutMin");
        IERC20(dstToken).safeTransfer(msg.sender, balance);
    }
}

/**
 * Augustus Swapper
 * Paraswap main exchange interface
 */
interface IParaswap {
    function getTokenTransferProxy() external view returns (address);
}
