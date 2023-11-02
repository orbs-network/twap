// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Base} from "script/Base.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

contract DeployExchange is Base {
    function run() public returns (address) {
        return address(0);
    }
}
