// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {IExchange} from "../IExchange.sol";

contract MockExchange is IExchange {
    using SafeERC20 for IERC20;

    uint256[] public amounts;

    function setMockAmounts(uint256[] memory _amounts) public {
        amounts = _amounts;
    }

    /**
     * assumes holds balance of dstToken
     */
    function swap(
        address _srcToken,
        address _dstToken,
        uint256 amountIn,
        uint256,
        bytes calldata,
        bytes calldata
    ) public {
        IERC20 srcToken = IERC20(_srcToken);
        IERC20 dstToken = IERC20(_dstToken);
        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);

        uint256 amountOut = amounts[amounts.length - 1];
        dstToken.safeTransfer(msg.sender, amountOut);
    }
}
