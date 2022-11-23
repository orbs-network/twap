// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";
import "../OrderLib.sol";
import "../TWAP.sol";

/**
 * Helper contract for TWAP taker
 * optionally swaps fee to native token at fill
 */
contract Taker is Ownable {
    using SafeERC20 for ERC20;

    TWAP public immutable twap;

    constructor(TWAP _twap) {
        twap = _twap;
    }

    /**
     * Perform bid
     */
    function bid(
        uint64 id,
        address exchange,
        uint256 dstFee,
        uint32 slippagePercent,
        bytes calldata data
    ) external onlyOwner {
        twap.bid(id, exchange, dstFee, slippagePercent, data);
    }

    /**
     * Execute the winning bid, optionally swap to native
     *
     * @param id OrderId
     * @param feeExchange optional IExchange address to swap for native token, can be 0
     * @param feeMinAmountOut optional native token minimum out, can be 0
     * @param feeData optional data to pass to feeExchange, can be empty
     */
    function fill(uint64 id, address feeExchange, uint256 feeMinAmountOut, bytes calldata feeData) external onlyOwner {
        twap.fill(id);
        OrderLib.Order memory o = twap.order(id);

        if (o.ask.dstToken != twap.iweth() && o.ask.dstToken != address(0) && feeExchange != address(0)) {
            uint256 dstAmount = ERC20(o.ask.dstToken).balanceOf(address(this));
            ERC20(o.ask.dstToken).safeIncreaseAllowance(feeExchange, dstAmount);
            IExchange(feeExchange).swap(o.ask.dstToken, twap.iweth(), dstAmount, feeMinAmountOut, feeData);
        }

        rescue(o.ask.dstToken);
    }

    /**
     * Unwrap and withdraw native token, along with optional token (can be 0), to owner
     */
    function rescue(address token) public {
        if (ERC20(twap.iweth()).balanceOf(address(this)) > 0) {
            IWETH(twap.iweth()).withdraw(ERC20(twap.iweth()).balanceOf(address(this)));
        }

        if (address(this).balance > 0) {
            Address.sendValue(payable(owner()), address(this).balance);
        }

        if (token != address(0) && ERC20(token).balanceOf(address(this)) > 0) {
            ERC20(token).safeTransfer(owner(), ERC20(token).balanceOf(address(this)));
        }
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks
}
