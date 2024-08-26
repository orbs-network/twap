// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";

contract DeployTaker is Script {
    function run() public returns (Taker) {
        address twap = vm.envAddress("TWAP");
        address allowed = vm.envAddress("ADMIN");
        vm.broadcast();
        return new Taker{salt: 0}(TWAP(payable(twap)), IAllowed(allowed));
    }
}
