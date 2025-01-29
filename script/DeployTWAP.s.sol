// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {TWAP} from "src/TWAP.sol";
import {Lens} from "src/periphery/Lens.sol";

contract DeployTWAP is Script {
    function run() public returns (TWAP twap, Lens lens) {
        address weth = vm.envAddress("WETH");
        address twapAddress = vm.envOr("TWAP", address(1000000));
        address lensAddress = vm.envOr("Lens", address(1000000));

        if (twapAddress.code.length > 0) {
            console.log("TWAP already deployed");
        } else {
            vm.broadcast();
            twap = new TWAP{salt: 0}(weth);
        }

        if (lensAddress.code.length > 0) {
            console.log("Lens already deployed");
        } else {
            vm.broadcast();
            lens = new Lens{salt: 0}(twap);
        }
    }
}
