// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";

contract DeployTaker is Script {
    error AddressMismatch(string message);

    function run() public returns (address taker) {
        TWAP twap = TWAP(payable(vm.envAddress("TWAP")));
        IAllowed admin = IAllowed(vm.envAddress("ADMIN"));

        bytes32 initCodeHash = hashInitCode(type(Taker).creationCode, abi.encode());
        taker = vm.computeCreate2Address(0, initCodeHash);

        if (taker.code.length == 0) {
            vm.broadcast();
            Taker deployed = new Taker{salt: 0}();
            if (taker != address(deployed)) revert AddressMismatch("deployment");

            vm.broadcast();
            deployed.init(twap, admin);
        } else {
            Taker deployed = Taker(payable(taker));
            if (deployed.twap() != twap) revert AddressMismatch("twap");
            if (deployed.allowed() != admin) revert AddressMismatch("admin");
            console.log("Taker already deployed");
        }
    }
}
