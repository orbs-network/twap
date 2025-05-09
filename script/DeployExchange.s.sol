// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IExchange} from "src/IExchange.sol";
import {ExchangeV2} from "src/exchange/ExchangeV2.sol";

contract DeployExchange is Script {
    function run() public returns (IExchange) {
        address router = vm.envAddress("ROUTER");
        address[] memory allowed = vm.envAddress("ALLOWED", ",");

        vm.broadcast();
        return new ExchangeV2{salt: bytes32(uint256(0))}(router, allowed);
    }
}
