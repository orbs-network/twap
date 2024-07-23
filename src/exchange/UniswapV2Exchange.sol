// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../IExchange.sol";

/**
 * Adapter between IUniswapV2 and TWAP's IExchange interface
 */
contract UniswapV2Exchange is IExchange {
    using SafeERC20 for ERC20;

    IUniswapV2 public immutable uniswap;

    constructor(address _uniswap) {
        uniswap = IUniswapV2(_uniswap);
    }

    /**
     * data = abi encoded: feeOnTransfer(bool), path(address[])
     */
    function getAmountOut(
        address srcToken,
        address dstToken,
        uint256 amountIn,
        bytes calldata,
        bytes calldata bidData
    ) public view returns (uint256 amountOut) {
        (, address[] memory path) = decode(bidData);
        require(path[0] == srcToken && path[path.length - 1] == dstToken, "UE1");
        return uniswap.getAmountsOut(amountIn, path)[path.length - 1];
    }

    /**
     * data = abi encoded: feeOnTransfer(bool), path(address[])
     */
    function swap(
        address _srcToken,
        address,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata,
        bytes calldata bidData
    ) public {
        (bool fotTokens, address[] memory path) = decode(bidData);
        ERC20 srcToken = ERC20(_srcToken);

        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = srcToken.balanceOf(address(this)); // support FoT tokens

        srcToken.safeIncreaseAllowance(address(uniswap), amountIn);

        if (fotTokens) {
            uniswap.swapExactTokensForTokensSupportingFeeOnTransferTokens(
                amountIn,
                amountOutMin,
                path,
                msg.sender,
                block.timestamp
            );
        } else {
            uniswap.swapExactTokensForTokens(amountIn, amountOutMin, path, msg.sender, block.timestamp);
        }
    }

    function decode(bytes calldata data) private pure returns (bool fotTokens, address[] memory path) {
        (fotTokens, path) = abi.decode(data, (bool, address[]));
    }
}

interface IUniswapV2 {
    function getAmountsOut(uint256 amountIn, address[] calldata path) external view returns (uint256[] memory amounts);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}
