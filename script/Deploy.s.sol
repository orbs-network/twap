// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";

contract Deploy is Script {
    bytes32 constant SALT0 = 0x15f1c43aeb27f46f344846db8cd43cc355ceef71562c18b0e1e2b78b7f1a21bf;
    bytes32 constant SALT1 = 0xdb8cb4d00d8df88cc17593fcdf17ac1ba5e363160bcee3824e0b77886bcfe657;

    error AddressMismatch(string message);

    function run() public returns (address taker, address taker2) {
        TWAP twap = TWAP(payable(vm.envAddress("TWAP")));
        IAllowed admin = IAllowed(vm.envAddress("ADMIN"));
        taker = deployTaker(twap, admin, SALT0);
        taker2 = deployTaker(twap, admin, SALT1);
    }

    function deployTaker(TWAP twap, IAllowed admin, bytes32 salt) private returns (address taker) {
        bytes32 initCodeHash = hashInitCode(type(Taker).creationCode, abi.encode());
        taker = vm.computeCreate2Address(salt, initCodeHash);

        if (taker.code.length == 0) {
            vm.broadcast();
            Taker deployed = new Taker{salt: salt}();
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
