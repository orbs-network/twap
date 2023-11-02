// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Taker} from "src/periphery/Taker.sol";

contract TreasuryAccessTest is Test {
// function test_Owned() public {
//     assertNotEq(config.treasury.owner(), address(0));
// }

// function test_Allowed() public {
//     assertEq(config.treasury.allowed(config.treasury.owner()), true);
//     assertEq(config.treasury.allowed(address(0)), false);
//     assertEq(config.treasury.allowed(address(1)), false);
// }

// function test_Allow_OnlyOwner() public {
//     hoax(config.treasury.owner());
//     address[] memory addrs = new address[](1);
//     addrs[0] = address(1);
//     config.treasury.set(addrs, true);
//     assertEq(config.treasury.allowed(address(1)), true);
// }

// function test_Revert_Allow_OnlyOwner() public {
//     vm.expectRevert("Ownable: caller is not the owner");
//     config.treasury.set(new address[](0), true);
// }

// function test_Withdraw_OnlyAllowed() public {
//     hoax(config.treasury.owner());
//     config.treasury.withdraw(new IERC20[](0));
// }

// function test_Revert_Withdraw_OnlyAllowed() public {
//     vm.expectRevert(abi.encodeWithSelector(Treasury.NotAllowed.selector, address(this)));
//     config.treasury.withdraw(new IERC20[](0));
// }
}
