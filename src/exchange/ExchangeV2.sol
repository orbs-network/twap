// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../IExchange.sol";

/**
 * Adapter between swap routers and TWAP's IExchange interface
 */
contract ExchangeV2 is IExchange, Ownable {
    using SafeERC20 for IERC20;

    address public immutable router;

    error InsufficientOutputAmount(uint256 actual, uint256 minimum);
    error TakerNotAllowed(address taker);

    constructor(address _router, address _admin) Ownable() {
        router = _router;
        transferOwnership(_admin);
    }

    function getAmountOut(address, address, uint256, bytes calldata, bytes calldata bidData)
        public
        view
        returns (uint256 dstAmountOut)
    {
        if (!IAllowed(owner()).allowed(tx.origin)) revert TakerNotAllowed(tx.origin);
        (dstAmountOut,) = decode(bidData);
    }

    function swap(
        address _srcToken,
        address _dstToken,
        uint256 amountIn,
        uint256 minOut,
        bytes calldata askData,
        bytes calldata bidData
    ) public {
        onlyAllowed(askData);

        (, bytes memory swapData) = decode(bidData);
        IERC20 src = IERC20(_srcToken);
        IERC20 dst = IERC20(_dstToken);

        src.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = src.balanceOf(address(this)); // support FoT tokens

        src.safeIncreaseAllowance(router, amountIn);
        Address.functionCall(router, swapData);

        uint256 balance = dst.balanceOf(address(this));
        if (balance < minOut) revert InsufficientOutputAmount(balance, minOut);

        dst.safeTransfer(msg.sender, balance);
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }

    function onlyAllowed(bytes calldata askData) private view {
        uint64 id = abi.decode(askData, (uint64));
        address taker = ITWAP(msg.sender).order(id).bid.taker;
        if (!IAllowed(owner()).allowed(taker)) revert TakerNotAllowed(taker);
    }
}

interface IAllowed {
    function allowed(address) external view returns (bool);
}

interface ITWAP {
    function order(uint64 id) external view returns (OrderLib.Order memory);
}
