// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Taker, IAllowed, TWAP} from "src/periphery/Taker.sol";

contract TakerAccessTest is Test {
    IAllowed public admin;
    TWAP public twap;
    Taker public taker;

    function setUp() public {
        admin = new MockAdmin();
        twap = new TWAP(address(new ERC20("weth", "WETH")));
        taker = new Taker();
        taker.init(twap, admin);
    }

    function test_Allowed() public {
        taker.rescue(address(0));
        assertEq(address(taker.allowed()), address(admin));
        assertEq(Ownable(address(admin)).owner(), address(this));
        assertTrue(admin.allowed(address(this)));
    }

    function testRevert_NotAllowed() public {
        address other = makeAddr("other");
        hoax(other);
        vm.expectRevert(abi.encodeWithSelector(Taker.NotAllowed.selector, other));
        taker.rescue(address(0));
    }
}

contract MockAdmin is IAllowed, Ownable {
    function allowed(address addr) public view returns (bool) {
        return addr == owner();
    }
}
