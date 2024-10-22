// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {TWAP} from "src/TWAP.sol";

contract DeployTWAP is Script {
    function run() public returns (TWAP) {
        address weth = vm.envAddress("WETH");
        vm.broadcast();
        return new TWAP{salt: 0}(weth);
    }
}
