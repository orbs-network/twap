// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../Interfaces.sol";
import "./IUniswapV2.sol";

contract UniswapV2Exchange is IExchange {
    using SafeERC20 for ERC20;

    IUniswapV2 public immutable uniswap;

    constructor(address _uniswap) {
        uniswap = IUniswapV2(_uniswap);
    }

    function getSwapTarget() public view returns (address) {
        return address(uniswap);
    }

    function getAmountOut(uint256 amountIn, address[] calldata path) public view returns (uint256 amountOut) {
        return getAmountsOut(amountIn, path)[path.length - 1];
    }

    function getAmountsOut(uint256 amountIn, address[] calldata path) public view returns (uint256[] memory amounts) {
        return uniswap.getAmountsOut(amountIn, path);
    }

    function swap(uint256 amountIn, address[] calldata path) public returns (uint256 amountOut) {
        ERC20 srcToken = ERC20(path[0]);

        //        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);
        //        srcToken.safeIncreaseAllowance(address(uniswap), amountIn);

        amountOut = uniswap.swapExactTokensForTokens(amountIn, 1, path, address(this), block.timestamp)[
            path.length - 1
        ];

        //        require(srcToken.balanceOf(address(this)) == 0, "dust");

        //        ERC20 dstToken = ERC20(path[path.length - 1]);
        //        dstToken.safeTransfer(msg.sender, dstToken.balanceOf(address(this)));
    }
}
