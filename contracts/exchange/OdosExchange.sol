// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {IExchange} from "../IExchange.sol";

/**
 * Adapter between Odos and TWAP's IExchange interface
 */
contract OdosExchange is IExchange {
    using SafeERC20 for IERC20;

    address public immutable odos;

    constructor(address _odos) {
        odos = _odos;
    }

    /**
     * data = amountOut, swap data from odos api
     */
    function swap(
        address srcToken,
        address dstToken,
        uint256 amountIn,
        uint256 amountOutMin,
        bytes calldata,
        bytes calldata bidData
    ) public {
        IERC20(srcToken).safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = IERC20(srcToken).balanceOf(address(this)); // support FoT tokens

        IERC20(srcToken).safeIncreaseAllowance(odos, amountIn);
        Address.functionCall(odos, bidData);

        uint256 balance = IERC20(dstToken).balanceOf(address(this));
        require(balance >= amountOutMin, "OdosExchange:amountOutMin");
        IERC20(dstToken).safeTransfer(msg.sender, balance);
    }
}
