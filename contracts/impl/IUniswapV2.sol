// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

interface IUniswapV2 {
    function getAmountOut(uint256 amountIn, address[] calldata path) external view returns (uint256 amount);

    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);
}
