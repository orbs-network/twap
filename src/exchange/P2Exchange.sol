// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";

/**
 * Adapter between swap routers using Permit2 and TWAP's IExchange interface
 */
contract P2Exchange is IExchange {
    using SafeERC20 for IERC20;

    address public immutable permit2;
    address public immutable router;
    mapping(address => bool) private allowed;

    error InsufficientOutputAmount(uint256 actual, uint256 minimum);
    error TakerNotAllowed(address taker);

    constructor(address _permit2, address _router, address[] memory _allowed) {
        permit2 = _permit2;
        router = _router;
        for (uint256 i = 0; i < _allowed.length; i++) {
            allowed[_allowed[i]] = true;
        }
    }

    function getAmountOut(address, address, uint256, bytes calldata, bytes calldata bidData, address taker)
        public
        view
        returns (uint256 dstAmountOut)
    {
        if (!allowed[taker]) revert TakerNotAllowed(taker);
        (dstAmountOut,) = decode(bidData);
    }

    function swap(
        address _srcToken,
        address _dstToken,
        uint256 amountIn,
        uint256 minOut,
        bytes calldata,
        bytes calldata bidData,
        address taker
    ) public {
        if (!allowed[taker]) revert TakerNotAllowed(taker);

        (, bytes memory swapData) = decode(bidData);
        IERC20 src = IERC20(_srcToken);
        IERC20 dst = IERC20(_dstToken);

        src.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = src.balanceOf(address(this)); // support FoT tokens

        src.forceApprove(router, amountIn);
        IPermit2(permit2).approve(address(src), router, type(uint160).max, type(uint48).max);
        Address.functionCall(router, swapData);

        uint256 balance = dst.balanceOf(address(this));
        if (balance < minOut) revert InsufficientOutputAmount(balance, minOut);

        dst.safeTransfer(msg.sender, balance);
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }
}

interface IPermit2 {
    function approve(address token, address spender, uint160 amount, uint48 expiration) external;
}
