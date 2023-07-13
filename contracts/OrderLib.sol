// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

library OrderLib {
    struct Order {
        uint64 id; // order id
        uint32 status; // deadline canceled or completed
        uint32 time; // order creation timestamp
        address maker; // order creator
        Ask ask; // order ask parameters
        Bid bid; // current winning bid
        Filled filled; // total filled data
    }

    struct Ask {
        address exchange; // restirct swap to this exchange, or zero address for any exchange
        address srcToken; // input token
        address dstToken; // output token
        uint256 srcBidAmount; // srcToken amount per chunk
        uint256 dstMinAmount; // dstToken minimum output per chunk
        uint32 count; // number of chunks
        uint32 deadline; // order duration timestamp
        uint32 bidDelay; // minimum delay in seconds before a bid can be filled
        uint32 fillDelay; // minimum delay in seconds between chunks
        bytes data; // optional swap data for exchange
    }

    struct Bid {
        uint32 time; // bid creation timestamp
        address taker; // bidder
        address exchange; // execute bid on this exchange, never zero
        uint256 dstAmount; // dstToken actual output amount to maker for this bid after exchange fees, taker fee and slippage
        uint256 dstFee; // dstToken requested by taker for performing the bid and fill
        bytes data; // optional additional swap data for exchange
    }

    struct Filled {
        uint32 time; // last fill timestamp
        uint32 count; // filled chunks
        uint256 dstAmount; // dstToken total filled amount (for maker)
        uint256 dstFee; // dstToken total fee amount (for taker)
    }

    /**
     * new Order for msg.sender
     */
    function newOrder(uint64 id, Ask calldata ask) internal view returns (Order memory order) {
        require(block.timestamp < type(uint32).max, "uint32");
        order.id = id;
        order.status = ask.deadline;
        order.time = uint32(block.timestamp);
        order.maker = msg.sender;
        order.ask = ask;
    }

    /**
     * new Bid
     */
    function newBid(
        Order memory self,
        address exchange,
        uint256 dstAmount,
        uint256 dstFee,
        bytes memory data
    ) internal view {
        require(block.timestamp < type(uint32).max, "uint32");
        self.bid = OrderLib.Bid(uint32(block.timestamp), msg.sender, exchange, dstAmount, dstFee, data);
    }

    /**
     * chunk filled
     */
    function newFill(Order memory self, uint256 dstAmount) internal view {
        require(block.timestamp < type(uint32).max, "uint32");
        self.filled.time = uint32(block.timestamp);
        self.filled.count += 1;
        self.filled.dstAmount += dstAmount;
        self.filled.dstFee += self.bid.dstFee;
        delete self.bid;
    }

    function hasAllowance(Order memory self, address target) internal view returns (bool) {
        return
            IERC20(self.ask.srcToken).balanceOf(self.maker) >= self.ask.srcBidAmount &&
            IERC20(self.ask.srcToken).allowance(self.maker, target) >= self.ask.srcBidAmount;
    }
}
