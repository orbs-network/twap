// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import "../IExchange.sol";
import "../OrderLib.sol";
import "../TWAP.sol";

/**
 * Helper contract for TWAP takers
 * optionally swaps fee to native token at fill
 */
contract Taker is Ownable {
    using SafeERC20 for ERC20;

    TWAP public immutable twap;
    ITreasury public immutable treasury;

    constructor(TWAP _twap, ITreasury _treasury) {
        twap = _twap;
        treasury = _treasury;
    }

    /**
     * Perform bid
     */
    function bid(uint64 id, address exchange, uint256 dstFee, uint32 slippagePercent, bytes calldata data)
        external
        onlyAllowed
    {
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
    function fill(uint64 id, address feeExchange, uint256 feeMinAmountOut, bytes calldata feeData)
        external
        onlyAllowed
    {
        twap.fill(id);
        OrderLib.Order memory o = twap.order(id);

        if (o.ask.dstToken != twap.iweth() && o.ask.dstToken != address(0) && feeExchange != address(0)) {
            uint256 dstAmount = ERC20(o.ask.dstToken).balanceOf(address(this));
            ERC20(o.ask.dstToken).safeIncreaseAllowance(feeExchange, dstAmount);
            IExchange(feeExchange).swap(o.ask.dstToken, twap.iweth(), dstAmount, feeMinAmountOut, o.ask.data, feeData);
        }

        rescue(o.ask.dstToken);
    }

    /**
     * Send all balance of token, wrapped native and native to sender
     */
    function rescue(address token) public onlyAllowed {
        if (ERC20(twap.iweth()).balanceOf(address(this)) > 0) {
            IWETH(twap.iweth()).withdraw(ERC20(twap.iweth()).balanceOf(address(this)));
        }

        if (address(this).balance > 0) {
            Address.sendValue(payable(msg.sender), address(this).balance);
        }

        if (token != address(0) && ERC20(token).balanceOf(address(this)) > 0) {
            ERC20(token).safeTransfer(msg.sender, ERC20(token).balanceOf(address(this)));
        }
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks

    error NotAllowed(address caller);

    modifier onlyAllowed() {
        if (!treasury.allowed(msg.sender)) revert NotAllowed(msg.sender);
        _;
    }
}

interface ITreasury {
    function allowed(address) external view returns (bool);
}
