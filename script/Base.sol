// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

abstract contract BaseScript is Script {
    address public deployer = msg.sender;

    function setUp() public {
    }
}
