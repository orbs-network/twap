// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {Consts} from "./Consts.sol";
import {IWETH} from "./IWETH.sol";
import {IMulticall, Call} from "./IMulticall.sol";

contract Treasury is Ownable {
    using SafeERC20 for IERC20;

    IWETH public immutable weth;
    mapping(address => bool) public allowed;

    constructor(IWETH _weth, address _owner) Ownable() {
        weth = _weth;
        allowed[_owner] = true;
        transferOwnership(_owner);
    }

    error NotAllowed(address sender);

    modifier onlyAllowed() {
        if (!allowed[msg.sender]) revert NotAllowed(msg.sender);
        _;
    }

    function set(address[] calldata addr, bool value) external onlyOwner {
        for (uint256 i = 0; i < addr.length; i++) {
            allowed[addr[i]] = value;
        }
    }

    function execute(Call[] calldata calls) external onlyAllowed {
        Address.functionDelegateCall(
            Consts.MULTICALL_ADDRESS,
            abi.encodeWithSelector(IMulticall.aggregate.selector, calls)
        );
        withdraw(new IERC20[](0));
    }

    function withdraw(IERC20[] memory tokens) public onlyAllowed {
        for (uint256 i = 0; i < tokens.length; i++) {
            tokens[i].safeTransfer(owner(), tokens[i].balanceOf(address(this)));
        }
        weth.withdraw(weth.balanceOf(address(this)));
        Address.sendValue(payable(owner()), address(this).balance);
    }

    receive() external payable {
        // accept ETH
    }
}
