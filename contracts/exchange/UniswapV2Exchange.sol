// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../IExchange.sol";
import "./IUniswapV2.sol";

contract UniswapV2Exchange is IExchange {
    using SafeERC20 for ERC20;

    IUniswapV2 public immutable uniswap;

    constructor(address _uniswap) {
        uniswap = IUniswapV2(_uniswap);
    }

    /**
     * data = abi encoded address[]
     */
    function getAmountOut(uint256 amountIn, bytes calldata data) public view returns (uint256 amountOut) {
        address[] memory path = abi.decode(data, (address[]));
        return uniswap.getAmountsOut(amountIn, path)[path.length - 1];
    }

    /**
     * data = abi encoded address[]
     */
    function swap(
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata data
    ) public returns (uint256 amountOut) {
        address[] memory path = abi.decode(data, (address[]));
        ERC20 srcToken = ERC20(path[0]);
        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);
        srcToken.safeIncreaseAllowance(address(uniswap), amountIn);
        return
            uniswap.swapExactTokensForTokens(amountIn, amountOutMin, path, msg.sender, block.timestamp)[
                path.length - 1
            ];
    }
}
