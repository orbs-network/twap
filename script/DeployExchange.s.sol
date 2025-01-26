// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IExchange} from "src/IExchange.sol";
import {RouterExchange} from "src/exchange/RouterExchange.sol";
import {ParaswapExchange} from "src/exchange/ParaswapExchange.sol";

contract DeployExchange is Script {
    function run() public returns (IExchange) {
        address router = vm.envAddress("ROUTER");
        vm.broadcast();
        return new ParaswapExchange{salt: 0}(router);
    }
}
