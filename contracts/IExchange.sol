// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./OrderLib.sol";

/**
 * Adapter between TWAP and exchange implementation
 */
interface IExchange {
    /**
     * Returns actual output amount after fees and price impact
     */
    function getAmountOut(uint256 amountIn, bytes calldata data) external view returns (uint256 amountOut);

    /**
     * Swaps amountIn to amount out of data (can either be path or more complex data)
     * Must verify amountOutMin!
     * Returns actual output amount after fees and price impact
     */
    function swap(
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata data
    ) external returns (uint256 amountOut);
}
