// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Taker, ITreasury, TWAP} from "src/periphery/Taker.sol";

contract TakerAccessTest is Test {
    ITreasury public treasury;
    TWAP public twap;
    Taker public taker;

    function setUp() public {
        treasury = new MockTreasury();
        twap = new TWAP(address(new ERC20("weth", "WETH")));
        taker = new Taker(twap, treasury);
    }

    function test_Allowed() public {
        taker.rescue(address(0));
        assertEq(address(taker.treasury()), address(treasury));
        assertEq(Ownable(address(treasury)).owner(), address(this));
        assertTrue(treasury.allowed(address(this)));
    }

    function testRevert_NotAllowed() public {
        address other = makeAddr("other");
        hoax(other);
        vm.expectRevert(abi.encodeWithSelector(Taker.NotAllowed.selector, other));
        taker.rescue(address(0));
    }
}

contract MockTreasury is ITreasury, Ownable {
    function allowed(address addr) public view returns (bool) {
        return addr == owner();
    }
}
