// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IExchange} from "src/IExchange.sol";
import {ParaswapExchange} from "src/exchange/ParaswapExchange.sol";

contract DeployParaswap is Script {
    address public constant router = 0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57;

    function run() public returns (IExchange) {
        address[] memory allowed = vm.envAddress("ALLOWED", ",");
        address approve = vm.envAddress("APPROVE");

        vm.broadcast();
        return new ParaswapExchange{salt: 0}(router, approve, allowed);
    }
}
