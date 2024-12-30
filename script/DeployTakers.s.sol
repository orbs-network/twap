// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";
import {RouterExchange} from "src/exchange/RouterExchange.sol";

contract DeployTakers is Script {
    bytes32 constant SALT0 = 0xeebfadf7c7976424d97712099e237f577e0e42d717893722b6993a7582256be3;
    bytes32 constant SALT1 = 0x22957517978ea07e66e4180ae8bc51ecf212f0dbadb6de6c18933d242ea5a073;

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
