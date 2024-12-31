// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";
import {RouterExchange} from "src/exchange/RouterExchange.sol";

contract DeployTakers is Script {
    bytes32 constant SALT0 = 0x2c727ad42be2d03d21aaf12954ec8a1b1c89f5636eaa4b6147750b7210a4b459;
    bytes32 constant SALT1 = 0x661183b6cf3d3c08e70cebdfbee5dcb0cd7282b29914b072c0e5e6c968529d64;

    function run() public returns (address taker, address taker2) {
        TWAP twap = TWAP(payable(vm.envAddress("TWAP")));
        IAllowed admin = IAllowed(vm.envAddress("ADMIN"));
        taker = _taker(twap, admin, SALT0);
        taker2 = _taker(twap, admin, SALT1);
    }

    function _taker(TWAP twap, IAllowed admin, bytes32 salt) private returns (address taker) {
        bytes32 initCodeHash = hashInitCode(type(Taker).creationCode, abi.encode());
        console.logBytes32(initCodeHash);
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
