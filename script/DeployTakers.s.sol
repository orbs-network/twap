// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Taker, TWAP, IAllowed} from "src/periphery/Taker.sol";
import {RouterExchange} from "src/exchange/RouterExchange.sol";

contract DeployTakers is Script {
    bytes32 constant SALT0 = 0xbfb1327afb65b29f1ef907d624f74f852b9f25a908336204e48fba6733c53d1d;
    bytes32 constant SALT1 = 0xcc42be215c2b9e0db61b91d5efdafc5449686e00250ffa072a5f4501fbe0f05a;

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
