// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Base} from "script/Base.sol";

import {RouterExchange} from "src/exchange/RouterExchange.sol";

contract DeployExchange is Base {
    function run() public returns (address) {
        vm.broadcast(deployer);
        return address(new RouterExchange{salt:0}(0x544bA588efD839d2692Fc31EA991cD39993c135F));
    }
}
