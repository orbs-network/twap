// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Base} from "script/Base.sol";

import {TWAP} from "contracts/TWAP.sol";

contract DeployTWAP is Base {
    function run() public returns (TWAP) {
        vm.broadcast(deployer);
        return new TWAP{salt:0x00}(config.weth);
    }
}
