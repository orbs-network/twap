// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Base} from "script/Base.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

contract DeployTWAP is Base {
    function run() public returns (address) {
        vm.broadcast(deployer);
        TWAP result = new TWAP{salt:0x00}(config.weth);
        return address(result);
    }
}
