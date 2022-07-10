// SPDX-License-Identifier: MIT
// solhint-disable not-rely-on-time
pragma solidity 0.8.10;

import "@openzeppelin/contracts/utils/math/Math.sol";

library OrderLib {
    struct Ask {
        uint256 time;
        uint256 deadline;
        address maker;
        address srcToken;
        address dstToken;
        uint256 srcAmount;
        uint256 srcBidAmount;
        uint256 dstMinAmount;
        address onFillCallback;
    }

    struct Bid {
        uint256 time;
        address taker;
        address exchange;
        address[] path;
        uint256 amount;
        uint256 fee;
    }

    struct Fill {
        uint256 time;
        uint256 amount;
    }

    struct Order {
        uint256 id;
        Ask ask;
        Bid bid;
        Fill filled;
    }

    function newOrder(
        uint256 id,
        address srcToken,
        address dstToken,
        uint256 srcAmount,
        uint256 srcBidAmount,
        uint256 dstMinAmount,
        uint256 deadline,
        address onFillCallback
    ) internal view returns (Order memory) {
        return
            Order(
                id,
                Ask(
                    block.timestamp,
                    deadline,
                    msg.sender,
                    srcToken,
                    dstToken,
                    srcAmount,
                    srcBidAmount,
                    dstMinAmount,
                    onFillCallback
                ),
                newBid(),
                Fill(
                    0, // time
                    0 // amount
                )
            );
    }

    function newBid() internal pure returns (Bid memory) {
        return
            Bid(
                0, // time
                address(0), // taker
                address(0), // exchange
                new address[](0), // path
                0, // amount
                0 // fee
            );
    }

    function srcBidAmountNext(Order memory self) internal pure returns (uint256) {
        return Math.min(self.ask.srcBidAmount, self.ask.srcAmount - self.filled.amount);
    }

    function dstMinAmountNext(Order memory self) internal pure returns (uint256) {
        return
            Math.min(
                self.ask.dstMinAmount,
                (self.ask.dstMinAmount * (self.ask.srcAmount - self.filled.amount)) / self.ask.srcBidAmount
            );
    }
}
