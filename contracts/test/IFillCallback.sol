// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "../OrderLib.sol";

interface IFillCallback {
    function onFill(
        OrderLib.Order memory o,
        uint256 srcAmountIn,
        uint256 dstAmountOut
    ) external;
}
