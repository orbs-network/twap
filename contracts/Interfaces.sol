// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

interface IExchange {
    function getAmountOut(uint256 amountIn, address[] calldata path) external view returns (uint256 amountOut);

    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);

    function swap(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path
    ) external returns (uint256 amountOut);
}
