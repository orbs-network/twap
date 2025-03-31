// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";

/**
 * Adapter between swap routers and TWAP's IExchange interface
 */
contract RouterExchange is IExchange {
    using SafeERC20 for ERC20;

    address public immutable router;
    uint256 public feeBasisPoints;
    uint256 public constant BPS = 10000;
    address public feeRecipient;
    
    error InsufficientOutputAmount(uint256 actual, uint256 minimum);

    constructor(address _router) {
        router = _router;
    }

    /**
     * data = amountOut, swap data from router api
     */
    function getAmountOut(address, address, uint256, bytes calldata, bytes calldata bidData)
        public
        pure
        returns (uint256 dstAmountOut)
    {
        (dstAmountOut,) = decode(bidData);
    }

    /**
     * data = amountOut, swap data from router api
     */
    function swap(
        address _srcToken,
        address _dstToken,
        uint256 amountIn,
        uint256 minOut,
        bytes calldata,
        bytes calldata bidData
    ) public {
        (, bytes memory swapData) = decode(bidData);
        ERC20 src = ERC20(_srcToken);
        ERC20 dst = ERC20(_dstToken);

        src.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = src.balanceOf(address(this)); // support FoT tokens

        src.safeIncreaseAllowance(router, amountIn);
        Address.functionCall(router, swapData);

        uint256 balance = dst.balanceOf(address(this));
        if (balance < minOut) revert InsufficientOutputAmount(balance, minOut);
        
        // Calculate fee and transfer in one check
        uint256 feeAmt = (balance * feeBasisPoints) / BPS;
        if (feeAmt > 0 && feeRecipient != address(0)) {
            dst.safeTransfer(feeRecipient, feeAmt);
        }
        
        // Transfer remaining balance to caller
        dst.safeTransfer(msg.sender, dst.balanceOf(address(this)));
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }
}
