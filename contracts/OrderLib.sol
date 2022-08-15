// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/utils/math/Math.sol";

library OrderLib {
    struct Ask {
        uint256 time; // order creation timestamp
        uint256 deadline; // order duration timestamp
        address maker; // order creator
        address exchange; // swap only on this exchange, or zero for any exchange
        address srcToken; // input token
        address dstToken; // output token
        uint256 srcAmount; // input total order amount
        uint256 srcBidAmount; // input chunk size
        uint256 dstMinAmount; // minimum output chunk size
        uint256 delay; // minimum delay in seconds between chunks
    }

    struct Bid {
        uint256 time; // bid creation timestamp
        address taker; // bidder
        address exchange; // execute bid on this exchange, never zero
        bytes data; // swap data to pass to exchange
        uint256 amount; // dstToken output amount for this bid after fees
        uint256 fee; // dstToken requested by taker for performing the bid and fill
    }

    struct Fill {
        uint256 time; // last fill timestamp
        uint256 amount; // srcToken total filled amount
    }

    struct Order {
        uint256 id; // order id
        Ask ask; // order ask parameters
        Bid bid; // current winning bid
        Fill filled; // total filled
    }

    /**
     * new Order for msg.sender
     */
    function newOrder(
        uint256 id,
        address exchange,
        address srcToken,
        address dstToken,
        uint256 srcAmount,
        uint256 srcBidAmount,
        uint256 dstMinAmount,
        uint256 deadline,
        uint256 delay
    ) internal view returns (Order memory) {
        return
            Order(
                id,
                Ask(
                    block.timestamp,
                    deadline,
                    msg.sender,
                    exchange,
                    srcToken,
                    dstToken,
                    srcAmount,
                    srcBidAmount,
                    dstMinAmount,
                    delay
                ),
                newBid(),
                Fill(
                    0, // time
                    0 // amount
                )
            );
    }

    /**
     * new empty Bid
     */
    function newBid() internal pure returns (Bid memory) {
        return
            Bid(
                0, // time
                address(0), // taker
                address(0), // exchange
                new bytes(0), // data
                0, // amount
                0 // fee
            );
    }

    /**
     * next chunk srcToken: either ask.srcBidAmount or leftover
     */
    function srcBidAmountNext(Order memory self) internal pure returns (uint256) {
        return Math.min(self.ask.srcBidAmount, self.ask.srcAmount - self.filled.amount);
    }

    /**
     * next chunk dstToken minimum amount out: either ask.dstMinAmount or leftover
     */
    function dstMinAmountNext(Order memory self) internal pure returns (uint256) {
        return
            Math.min(
                self.ask.dstMinAmount,
                (self.ask.dstMinAmount * (self.ask.srcAmount - self.filled.amount)) / self.ask.srcBidAmount
            );
    }
}
