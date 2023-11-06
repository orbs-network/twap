// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Base} from "script/Base.sol";

import {Lens, TWAP} from "src/periphery/Lens.sol";

contract DeployLens is Base {
    function run() public returns (address) {
        vm.broadcast(deployer);
        Lens result = new Lens{salt: 0x00}(TWAP(payable(config.twap)));
        return address(result);
    }
}
