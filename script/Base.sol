// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

abstract contract Base is Script {
    struct Config {
        uint256 chainId;
        string name;
        ITreasury treasury;
        address twap;
        address weth;
    }

    address public deployer;
    Config public config;

    function setUp() public {
        vm.createSelectFork(vm.envString("ETH_RPC_URL"));
        deployer = vm.rememberKey(vm.envUint("DEPLOYER_PK"));
        config = abi.decode(
            vm.parseJson(vm.readFile(string.concat("script/input/", vm.toString(block.chainid), "/config.json"))),
            (Config)
        );
        if (config.chainId != block.chainid) revert("chainId mismatch");
    }
}
