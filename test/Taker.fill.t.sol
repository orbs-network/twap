// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import "forge-std/Test.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Taker, IAllowed, TWAP, OrderLib, IWETH} from "src/periphery/Taker.sol";

contract TakerFillTest is Test {
    IAllowed public admin;
    TWAP public twap;
    Taker public taker;
    address public swapper;

    address public swapFeeExchange;
    address public fees;
    bytes public swapFeeData = new bytes(0);

    ERC20 public srcToken;
    ERC20 public dstToken;
    IWETH public weth;

    uint64 public id;

    function setUp() public {
        admin = new MockAdmin();
        weth = new MockWETH(vm);
        twap = new TWAP(address(weth));
        taker = new Taker();
        taker.init(twap, admin);

        swapper = makeAddr("swapper");
        fees = makeAddr("fees");
        swapFeeExchange = makeAddr("swapFeeExchange");

        srcToken = new ERC20("src", "SRC");
        dstToken = new ERC20("dst", "DST");
        deal(address(srcToken), swapper, 100 ether);

        hoax(swapper);
        srcToken.approve(address(twap), type(uint256).max);
        hoax(swapper);
        id = twap.ask(
            OrderLib.Ask(
                address(0),
                address(srcToken),
                address(dstToken),
                100 ether,
                10 ether,
                1,
                uint32(block.timestamp + 1000),
                30,
                0,
                new bytes(0)
            )
        );
    }

    function test_erc20s() public {
        vm.mockCall(address(twap), abi.encodeWithSelector(TWAP.fill.selector), new bytes(0));

        taker.fill(id, fees, 0, swapFeeExchange, swapFeeData);
    }

    receive() external payable {}
}

contract MockAdmin is IAllowed, Ownable {
    function allowed(address addr) public view returns (bool) {
        return addr == owner();
    }
}

contract MockWETH is IWETH, ERC20 {
    Vm public vm;

    constructor(Vm _vm) ERC20("WETH", "WETH") {
        vm = _vm;
    }

    function deposit() external payable {}

    function withdraw(uint256 amount) external override {
        vm.deal(msg.sender, amount);
    }

    receive() external payable {}
}
