// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IExchange} from "src/IExchange.sol";
import {P2Exchange} from "src/exchange/P2Exchange.sol";

contract DeployP2Exchange is Script {
    function run() public returns (IExchange) {
        address router = vm.envAddress("ROUTER");
        address permit2 = vm.envAddress("PERMIT2");
        address[] memory allowed = vm.envAddress("ALLOWED", ",");

        vm.broadcast();
        return new P2Exchange{salt: bytes32(uint256(0))}(permit2, router, allowed);
    }
}
