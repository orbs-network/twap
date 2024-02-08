// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";

/**
 * Adapter between Kyber and TWAP's IExchange interface
 */
contract KyberExchange is IExchange {
    using SafeERC20 for ERC20;

    address public immutable kyber;

    constructor(address _kyber) {
        kyber = _kyber;
    }

    /**
     * data = amountOut, swap data from kyber api
     */
    function getAmountOut(address, address, uint256, bytes calldata, bytes calldata bidData)
        public
        pure
        returns (uint256 dstAmountOut)
    {
        (dstAmountOut,) = decode(bidData);
    }

    /**
     * data = amountOut, swap data from kyber api
     */
    function swap(
        address _srcToken,
        address _dstToken,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata,
        bytes calldata bidData
    ) public {
        (, bytes memory swapdata) = decode(bidData);
        ERC20 srcToken = ERC20(_srcToken);
        ERC20 dstToken = ERC20(_dstToken);

        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = srcToken.balanceOf(address(this)); // support FoT tokens

        srcToken.safeIncreaseAllowance(kyber, amountIn);
        Address.functionCall(kyber, swapdata);

        uint256 balance = dstToken.balanceOf(address(this));
        require(balance >= amountOutMin, "KyberExchange:swap:amountOutMin");
        dstToken.safeTransfer(msg.sender, balance);
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }
}
