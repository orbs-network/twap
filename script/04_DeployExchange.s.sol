// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Base} from "script/Base.sol";

import {KyberExchange} from "src/exchange/KyberExchange.sol";

contract DeployExchange is Base {
    function run() public returns (address) {
        vm.broadcast(deployer);
        return address(new KyberExchange{salt:0}(0x6131B5fae19EA4f9D964eAc0408E4408b66337b5));
    }
}
