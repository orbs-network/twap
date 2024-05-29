// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";
import "forge-std/Script.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

abstract contract Base is Script {
    struct Config {
        uint256 chainId;
        string chainName;
        address lens;
        ITreasury treasury;
        address twap;
        address weth;
    }

    address public deployer = msg.sender;
    Config public config;

    function setUp() public {
        uint256 pk = vm.envOr("DEPLOYER_PK", uint256(0));
        if (pk != 0) deployer = vm.rememberKey(pk);

        config = abi.decode(
            vm.parseJson(vm.readFile(string.concat("script/input/", vm.toString(block.chainid), "/config.json"))),
            (Config)
        );
        require(config.chainId == block.chainid, "chainId mismatch");
    }
}
