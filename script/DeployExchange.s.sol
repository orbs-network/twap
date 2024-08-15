// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IExchange} from "src/IExchange.sol";
import {RouterExchange} from "src/exchange/RouterExchange.sol";

contract DeployExchange is Script {
    function run() public returns (IExchange) {
        address router = vm.envAddress("ROUTER");
        vm.broadcast();
        return new RouterExchange{salt: 0}(router);
    }
}
