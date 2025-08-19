// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";

/**
 * Adapter between IParaswap and TWAP's IExchange interface
 */
contract ParaswapExchange is IExchange {
    using SafeERC20 for ERC20;

    address public immutable paraswap;
    mapping(address => bool) private allowed;

    error InsufficientOutputAmount(uint256 actual, uint256 minimum);
    error TakerNotAllowed(address taker);

    constructor(address _router, address[] memory _allowed) {
        paraswap = _router;
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
        uint256 amountOutMin,
        bytes calldata,
        bytes calldata bidData,
        address taker
    ) public {
        if (!allowed[taker]) revert TakerNotAllowed(taker);

        (, bytes memory swapdata) = decode(bidData);
        ERC20 srcToken = ERC20(_srcToken);
        ERC20 dstToken = ERC20(_dstToken);

        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);
        amountIn = srcToken.balanceOf(address(this)); // support FoT tokens

        srcToken.safeIncreaseAllowance(IParaswap(paraswap).getTokenTransferProxy(), amountIn);
        Address.functionCall(address(paraswap), swapdata);

        uint256 balance = dstToken.balanceOf(address(this));
        if (balance < amountOutMin) revert InsufficientOutputAmount(balance, amountOutMin);

        dstToken.safeTransfer(msg.sender, balance);
    }

    function decode(bytes calldata data) private pure returns (uint256 amountOut, bytes memory swapdata) {
        return abi.decode(data, (uint256, bytes));
    }
}

interface IParaswap {
    function getTokenTransferProxy() external view returns (address);
}
