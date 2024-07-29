// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Lens, TWAP} from "src/periphery/Lens.sol";

contract DeployLens is Script {
    function run() public returns (Lens) {
        address twap = vm.envAddress("TWAP");
        vm.broadcast();
        return new Lens{salt: 0}(TWAP(payable(twap)));
    }
}
