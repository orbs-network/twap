// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {IWETH} from "../IWETH.sol";

interface IExchangeV3 {
    function getAmountOut(address, address, uint256, bytes calldata) external view returns (uint256);

    function swap(address, address, uint256, uint256, bytes calldata) external;
}

interface TWAPV3 {
    struct Order {
        uint64 id; // order id
        uint32 status; // status: deadline, canceled or completed
        uint32 filledTime; // last fill timestamp
        uint256 srcFilledAmount; // srcToken total filled amount
        Ask ask; // order ask parameters
        Bid bid; // current winning bid
    }

    struct Ask {
        uint32 time; // order creation timestamp
        uint32 deadline; // order duration timestamp
        uint32 bidDelay; // minimum delay in seconds before a bid can be filled
        uint32 fillDelay; // minimum delay in seconds between chunks
        address maker; // order creator
        address exchange; // swap only on this exchange, or zero for any exchange
        address srcToken; // input token
        address dstToken; // output token
        uint256 srcAmount; // input total order amount
        uint256 srcBidAmount; // input chunk size
        uint256 dstMinAmount; // minimum output chunk size
    }

    struct Bid {
        uint32 time; // bid creation timestamp
        address taker; // bidder
        address exchange; // execute bid on this exchange, never zero
        uint256 dstAmount; // dstToken actual output amount for this bid after exchange fees, taker fee and slippage
        uint256 dstFee; // dstToken requested by taker for performing the bid and fill
        bytes data; // swap data to pass to exchange, out dstToken==dstAmount+dstFee
    }

    function bid(uint64 id, address exchange, uint256 dstFee, uint32 slippagePercent, bytes calldata data) external;

    function fill(uint64 id) external;

    function order(uint64 id) external view returns (Order memory);

    function iweth() external view returns (address);
}

/**
 * Helper contract for TWAP takers
 * optionally swaps fee to native token at fill
 */
contract Taker is Ownable {
    using SafeERC20 for IERC20;

    TWAPV3 public immutable twap;
    mapping(address => bool) public owners;

    constructor(TWAPV3 _twap, address[] memory _owners) {
        twap = _twap;
        addOwners(_owners);
    }

    function addOwners(address[] memory _owners) public onlyOwner {
        for (uint i = 0; i < _owners.length; i++) owners[_owners[i]] = true;
    }

    function removeOwners(address[] memory _owners) external onlyOwner {
        for (uint i = 0; i < _owners.length; i++) owners[_owners[i]] = false;
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
    ) external onlyOwners {
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
    function fill(uint64 id, address feeExchange, uint256 feeMinAmountOut, bytes calldata feeData) external onlyOwners {
        twap.fill(id);
        TWAPV3.Order memory o = twap.order(id);

        if (o.ask.dstToken != twap.iweth() && o.ask.dstToken != address(0) && feeExchange != address(0)) {
            uint256 dstAmount = IERC20(o.ask.dstToken).balanceOf(address(this));
            IERC20(o.ask.dstToken).safeIncreaseAllowance(feeExchange, dstAmount);
            IExchangeV3(feeExchange).swap(o.ask.dstToken, twap.iweth(), dstAmount, feeMinAmountOut, feeData);
        }

        rescue(o.ask.dstToken);
    }

    /**
     * Send all balance of token, wrapped native and native to sender
     */
    function rescue(address token) public onlyOwners {
        if (IERC20(twap.iweth()).balanceOf(address(this)) > 0) {
            IWETH(twap.iweth()).withdraw(IERC20(twap.iweth()).balanceOf(address(this)));
        }

        if (address(this).balance > 0) {
            Address.sendValue(payable(msg.sender), address(this).balance);
        }

        if (token != address(0) && IERC20(token).balanceOf(address(this)) > 0) {
            IERC20(token).safeTransfer(msg.sender, IERC20(token).balanceOf(address(this)));
        }
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks

    modifier onlyOwners() {
        require(owners[msg.sender], "Taker:onlyOwners");
        _;
    }
}
