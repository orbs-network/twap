// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./IWETH.sol";
import "../IExchange.sol";
import "../OrderLib.sol";
import "../TWAP.sol";

contract Bidder is Ownable {
    using SafeERC20 for ERC20;

    address public immutable twap;
    address public immutable weth;

    constructor(address _twap, address _weth) {
        twap = _twap;
        weth = _weth;
    }

    function bid(
        uint256 id,
        address exchange,
        bytes calldata data,
        uint256 fee
    ) external onlyOwner {
        TWAP(twap).bid(id, exchange, data, fee);
    }

    function fill(
        uint256 id,
        address feeExchange,
        uint256 feeMinAmountOut,
        bytes calldata feeData
    ) external onlyOwner {
        OrderLib.Order memory o = TWAP(twap).order(id);
        uint256 fee = o.bid.fee;

        TWAP(twap).fill(id);

        uint256 dstBalance = ERC20(o.ask.dstToken).balanceOf(address(this));
        require(dstBalance >= fee, "insufficient fee");

        if (feeExchange != address(0)) {
            ERC20(o.ask.dstToken).safeIncreaseAllowance(feeExchange, dstBalance);
            IExchange(feeExchange).swap(dstBalance, feeMinAmountOut, feeData);
        }

        if (ERC20(weth).balanceOf(address(this)) > 0) {
            IWETH(weth).withdraw(ERC20(weth).balanceOf(address(this)));
            Address.sendValue(payable(msg.sender), address(this).balance);
        } else {
            ERC20(o.ask.dstToken).safeTransfer(msg.sender, dstBalance);
        }
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks
}
