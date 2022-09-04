// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../IExchange.sol";

contract MockExchange is IExchange {
    using SafeERC20 for ERC20;

    uint256[] public amounts;

    function setMockAmounts(uint256[] memory _amounts) public {
        amounts = _amounts;
    }

    function getAmountOut(uint256, bytes calldata) public view returns (uint256) {
        return amounts[amounts.length - 1];
    }

    /**
     * assumes holds balance of dstToken
     */
    function swap(
        uint256 amountIn,
        uint256,
        bytes calldata data
    ) public {
        (, address[] memory path) = abi.decode(data, (bool, address[]));
        ERC20 srcToken = ERC20(path[0]);
        ERC20 dstToken = ERC20(path[path.length - 1]);
        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);

        uint256 amountOut = amounts[amounts.length - 1];
        dstToken.safeTransfer(msg.sender, amountOut);
    }
}
