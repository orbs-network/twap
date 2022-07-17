// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "./OrderLib.sol";

interface IExchange {
    function getAmountOut(uint256 amountIn, bytes calldata data) external view returns (uint256 amountOut);

    function getAmountsOut(uint256 amountIn, bytes calldata data) external view returns (uint256[] memory amounts);

    function swap(
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata data
    ) external returns (uint256 amountOut);
}
