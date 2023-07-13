// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {OrderLib} from "./OrderLib.sol";

/**
 * Adapter between TWAP and exchange implementations
 */
interface IExchange {
    /**
     * Swaps amountIn to amount out using abi encoded data (can either be path or more complex data)
     */
    function swap(
        address srcToken,
        address dstToken,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata askData,
        bytes calldata bidData
    ) external;
}
