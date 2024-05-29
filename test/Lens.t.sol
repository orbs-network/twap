// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Lens, TWAP} from "src/periphery/Lens.sol";

contract TakerAccessTest is Test {
    TWAP public twap;
    Lens public lens;
    MockERC20 public token;
    address public maker = address(0x1);

    function setUp() public {
        twap = new TWAP(address(new ERC20("weth", "WETH")));
        lens = new Lens(twap);
        token = new MockERC20();
        token.transfer(maker, 100 ether);
    }

    function test_SafeAllowanceBalance() public {
        assertFalse(lens.hasAllowance(address(token), maker, 100));
        assertFalse(lens.hasBalance(address(token), maker, 100));
    }
}

contract MockERC20 is ERC20 {
    constructor() ERC20("token", "symbol") {
        _mint(msg.sender, 100 ether);
    }

    error ThrowsError();

    function allowance(address, address) public view override returns (uint256) {
        revert ThrowsError();
    }

    function balanceOf(address) public view override returns (uint256) {
        revert ThrowsError();
    }
}
