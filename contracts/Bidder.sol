// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./IWETH.sol";
import "./IExchange.sol";
import "./DOTC.sol";
import "./OrderLib.sol";

contract Bidder is Ownable {
    address public immutable dotc;
    address public immutable weth;

    constructor(address _dotc, address _weth) {
        dotc = _dotc;
        weth = _weth;
    }

    function bid(
        uint256 id,
        address exchange,
        bytes calldata data,
        uint256 fee
    ) external onlyOwner {
        DOTC(dotc).bid(id, exchange, data, fee);
    }

    function fill(
        uint256 id,
        uint256 minFeeAmountOut,
        address feeExchange,
        bytes calldata feeData
    ) external onlyOwner {
        OrderLib.Order memory o = DOTC(dotc).order(id);
        uint256 fee = o.bid.fee;

        DOTC(dotc).fill(id);

        uint256 feeBalance = IERC20(o.ask.dstToken).balanceOf(address(this));
        require(feeBalance >= fee, "insufficient fee");

        if (feeExchange != address(0)) {
            IExchange(feeExchange).swap(feeBalance, minFeeAmountOut, feeData);
        }

        IWETH(weth).withdraw(IERC20(weth).balanceOf(address(this)));
        Address.sendValue(payable(msg.sender), address(this).balance);
    }
}
