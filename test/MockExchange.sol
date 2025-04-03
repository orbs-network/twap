// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "src/IExchange.sol";

contract MockExchange is IExchange {
    using SafeERC20 for ERC20;

    uint256[] public amounts;

    function setMockAmounts(uint256[] memory _amounts) public {
        amounts = _amounts;
    }

    function getAmountOut(address, address, uint256, bytes calldata, bytes calldata, address)
        public
        view
        returns (uint256)
    {
        return amounts[amounts.length - 1];
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
        bytes calldata,
        address
    ) public {
        ERC20 srcToken = ERC20(_srcToken);
        ERC20 dstToken = ERC20(_dstToken);
        srcToken.safeTransferFrom(msg.sender, address(this), amountIn);

        uint256 amountOut = amounts[amounts.length - 1];
        dstToken.safeTransfer(msg.sender, amountOut);
    }
}
