// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {TWAP} from "src/TWAP.sol";
import {Lens} from "src/periphery/Lens.sol";

contract DeployTWAP is Script {
    function run() public returns (TWAP twap, Lens lens) {
        address weth = vm.envAddress("WETH");

        vm.broadcast();
        twap = new TWAP(weth);

        vm.broadcast();
        lens = new Lens(twap);
    }
}
