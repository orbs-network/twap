// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * Burns 10% of every transfer
 */
contract MockDeflationaryToken is ERC20("MockDeflationaryToken", "MDT") {
    constructor() {
        _mint(msg.sender, 100e18);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount) internal override {
        if (from != address(0) && to != address(0)) {
            _burn(to, amount / 10);
        }
    }
}
