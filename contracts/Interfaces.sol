// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

interface IExchange {
    function getSwapTarget() external view returns (address);

    function getAmountOut(uint256 amountIn, address[] calldata path) external view returns (uint256 amount);

    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);

    function swap(uint256 amountIn, address[] calldata path) external returns (uint256 amount);
}
