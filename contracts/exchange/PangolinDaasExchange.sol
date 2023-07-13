// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IExchange} from "../IExchange.sol";

/**
 * Adapter between PangolinDAAS and TWAP's IExchange interface
 */
contract PangolinDaasExchange is IExchange {
    using SafeERC20 for IERC20;

    IPangolinDaas public immutable pangolin;

    constructor(address _pangolin) {
        pangolin = IPangolinDaas(_pangolin);
    }

    /**
     * askData = abi encoded: partnerDaas(address)
     * bidData = abi encoded: feeOnTransfer(bool), path(address[])
     */
    function getAmountOut(
        address srcToken,
        address dstToken,
        uint256 amountIn,
        bytes calldata askData,
        bytes calldata bidData
    ) public view returns (uint256 amountOut) {
        (address partnerDaas, , address[] memory path) = decode(askData, bidData);
        require(path[0] == srcToken && path[path.length - 1] == dstToken, "PangolinDaasExchange:path");
        uint256 result = (pangolin.getAmountsOut(amountIn, path)[path.length - 1]);

        (, , uint24 feeTotal, , ) = pangolin.getFeeInfo(partnerDaas); // getAmountOut doesn't take the partner affiliate fee into account, which will be deducted when swapping
        return (result * (100_00 - feeTotal)) / 100_00;
    }

    /**
     * askData = abi encoded: partnerDaas(address)
     * bidData = abi encoded: feeOnTransfer(bool), path(address[])
     */
    function swap(
        address srcToken,
        address dstToken,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata askData,
        bytes calldata bidData
    ) public {
        (address partnerDaas, bool fotTokens, address[] memory path) = decode(askData, bidData);
        require(path[0] == srcToken && path[path.length - 1] == dstToken, "PangolinDaasExchange:path");

        IERC20(srcToken).safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = IERC20(srcToken).balanceOf(address(this)); // support FoT tokens

        IERC20(srcToken).safeIncreaseAllowance(address(pangolin), amountIn);

        if (fotTokens) {
            pangolin.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                amountOutMin,
                path,
                msg.sender,
                block.timestamp,
                partnerDaas
            );
        } else {
            pangolin.swapExactTokensForTokens(amountIn, amountOutMin, path, msg.sender, block.timestamp, partnerDaas);
        }
    }

    function decode(
        bytes calldata askData,
        bytes calldata bidData
    ) private pure returns (address partnerDaas, bool fotTokens, address[] memory path) {
        (partnerDaas) = abi.decode(askData, (address));
        (fotTokens, path) = abi.decode(bidData, (bool, address[]));
    }
}

interface IPangolinDaas {
    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline,
        address feeTo
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline,
        address feeTo
    ) external;

    function getFeeInfo(
        address feeTo
    ) external view returns (uint24 feePartner, uint24 feeProtocol, uint24 feeTotal, uint24 feeCut, bool initialized);
}
