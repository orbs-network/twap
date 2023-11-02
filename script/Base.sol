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
        address weth;
    }

    address public deployer;
    Config public config;

    function setUp() public {
        deployer = vm.rememberKey(vm.envUint("DEPLOYER_PK"));
        vm.chainId(vm.envUint("CHAIN"));
        config = abi.decode(
            vm.parseJson(vm.readFile(string.concat("script/input/", vm.toString(block.chainid), "/config.json"))),
            (Config)
        );
        if (config.chainId != block.chainid) revert("chainId mismatch");
    }

    function twap() internal view returns (TWAP) {
        return TWAP(
            payable(
                computeCreate2Address(
                    0x00, hashInitCode(type(TWAP).creationCode, abi.encode(config.weth)), address(this)
                )
            )
        );
    }
}
