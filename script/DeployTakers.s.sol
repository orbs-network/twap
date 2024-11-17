// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";
import {RouterExchange} from "src/exchange/RouterExchange.sol";

contract DeployTakers is Script {
    bytes32 constant SALT0 = 0x15f1c43aeb27f46f344846db8cd43cc355ceef71562c18b0e1e2b78b7f1a21bf;
    bytes32 constant SALT1 = 0xdb8cb4d00d8df88cc17593fcdf17ac1ba5e363160bcee3824e0b77886bcfe657;

    function run() public returns (address taker, address taker2) {
        TWAP twap = TWAP(payable(vm.envAddress("TWAP")));
        IAllowed admin = IAllowed(vm.envAddress("ADMIN"));
        taker = _taker(twap, admin, SALT0);
        taker2 = _taker(twap, admin, SALT1);
    }

    function _taker(TWAP twap, IAllowed admin, bytes32 salt) private returns (address taker) {
        bytes32 initCodeHash = hashInitCode(type(Taker).creationCode, abi.encode());
        taker = vm.computeCreate2Address(salt, initCodeHash);

        if (taker.code.length > 0) {
            if (Taker(payable(taker)).twap() != twap) revert("twap");
            if (Taker(payable(taker)).allowed() != admin) revert("admin");
            console.log("Taker already deployed");
            return taker;
        }

        vm.broadcast();
        Taker deployed = new Taker{salt: salt}();
        if (taker != address(deployed)) revert("deployment");

        vm.broadcast();
        deployed.init(twap, admin);
    }
}
