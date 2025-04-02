// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";
import {OrderLib} from "../OrderLib.sol";

/**
 * Adapter between swap routers and TWAP's IExchange interface
 */
contract ExchangeV2 is IExchange {
    using SafeERC20 for ERC20;

    address public immutable router;
    uint256 public immutable feeBPS;
    address public immutable feeRecipient;
    uint256 public constant BPS = 10000;

    error InsufficientOutputAmount(uint256 actual, uint256 minimum);
    error TakerNotAllowed(address taker);

    constructor(address _router, uint256 _feeBPS, address _feeRecipient) {
        router = _router;
        feeBPS = _feeBPS;
        feeRecipient = _feeRecipient;
    }

    function getAmountOut(address, address, uint256, bytes calldata, bytes calldata bidData)
        public
        view
        returns (uint256 dstAmountOut)
    {
        (dstAmountOut,) = decode(bidData);
        // Apply the fee reduction
        uint256 feeAmt = (dstAmountOut * feeBPS) / BPS;
        dstAmountOut -= feeAmt;
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
        ERC20 src = ERC20(_srcToken);
        ERC20 dst = ERC20(_dstToken);

        src.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = src.balanceOf(address(this)); // support FoT tokens

        src.safeIncreaseAllowance(router, amountIn);
        Address.functionCall(router, swapData);

        uint256 balance = dst.balanceOf(address(this));
        if (balance < minOut) revert InsufficientOutputAmount(balance, minOut);

        // Calculate fee and transfer in one check
        uint256 feeAmt = (balance * feeBPS) / BPS;
        if (feeAmt > 0 && feeRecipient != address(0)) {
            dst.safeTransfer(feeRecipient, feeAmt);
        }

        // Transfer remaining balance to caller
        dst.safeTransfer(msg.sender, dst.balanceOf(address(this)));
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }

    function onlyAllowed(bytes calldata askData) private view {
        (uint64 id, address[] memory allowed) = abi.decode(askData, (uint64, address[]));
        address taker = ITWAP(msg.sender).order(id).bid.taker;

        for (uint256 i = 0; i < allowed.length; i++) {
            if (allowed[i] == taker) return;
        }
        revert TakerNotAllowed(taker);
    }
}

interface ITWAP {
    function order(uint64 id) external view returns (OrderLib.Order memory);
}
