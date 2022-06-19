// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "../Interfaces.sol";

import "hardhat/console.sol";

contract MockExchange is IExchange {
    uint256[] public amounts;

    function setAmounts(uint256[] memory _amounts) public {
        amounts = _amounts;
    }

    function getAllowanceSpender() public view returns (address) {
        return address(this);
    }

    function getAmountOut(uint256, address[] calldata) public view returns (uint256) {
        return amounts[amounts.length - 1];
    }

    function getAmountsOut(uint256, address[] calldata) public view returns (uint256[] memory) {
        return amounts;
    }

    function swap(
        uint256,
        uint256,
        address[] calldata
    ) public view returns (uint256 amountOut) {
        return amounts[amounts.length - 1];
    }
}
