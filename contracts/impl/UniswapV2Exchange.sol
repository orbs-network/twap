// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "../Interfaces.sol";
import "./IUniswapV2.sol";

contract UniswapV2Exchange is IExchange {
    IUniswapV2 public immutable uniswap;

    constructor(address _uniswap) {
        uniswap = IUniswapV2(_uniswap);
    }

    function getAmountOut(uint256 amountIn, address[] calldata path) public view returns (uint256 amount) {
        return getAmountsOut(amountIn, path)[path.length - 1];
    }

    function getAmountsOut(uint256 amountIn, address[] calldata path) public view returns (uint256[] memory amounts) {
        return uniswap.getAmountsOut(amountIn, path);
    }
}
