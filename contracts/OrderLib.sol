// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

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
    }

    struct Bid {
        uint256 time;
        address taker;
        address exchange;
        address[] path;
        uint256 amount;
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

    function createOrder(
        uint256 id,
        address srcToken,
        address dstToken,
        uint256 srcAmount,
        uint256 srcBidAmount,
        uint256 dstMinAmount,
        uint256 deadline
    ) internal view returns (Order memory) {
        return
            Order(
                id,
                Ask(block.timestamp, deadline, msg.sender, srcToken, dstToken, srcAmount, srcBidAmount, dstMinAmount),
                Bid(
                    0, // time
                    address(0), // taker
                    address(0), // exchange
                    new address[](0), // path
                    0 // amount
                ),
                Fill(
                    0, // time
                    0 // amount
                )
            );
    }

    function clearBid(Order memory self) internal {
        self.bid.time = 0;
        self.bid.taker = address(0);
        self.bid.exchange = address(0);
        self.bid.path = new address[](0);
        self.bid.amount = 0;
    }
}
