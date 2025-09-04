// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IExchange} from "src/IExchange.sol";
import {ParaswapExchange} from "src/exchange/ParaswapExchange.sol";

contract DeployParaswap is Script {
    function run() public returns (IExchange) {
        address[] memory allowed = vm.envAddress("ALLOWED", ",");
        address router = vm.envAddress("ROUTER");

        vm.broadcast();
        return new ParaswapExchange{salt: bytes32(uint256(1))}(router, allowed);
    }
}
