// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Base} from "script/Base.sol";

import {Lens, TWAP} from "src/periphery/Lens.sol";

contract DeployLens is Base {
    function run() public returns (Lens) {
        vm.broadcast(deployer);
        return new Lens{salt: 0x00}(TWAP(payable(config.twap)));
    }
}
