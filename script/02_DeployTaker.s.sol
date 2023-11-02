// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Base} from "script/Base.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

contract DeployTaker is Base {
    function run() public returns (address) {
        Taker result = new Taker{salt: 0x00}(twap(), config.treasury);
        return address(result);
    }
}
