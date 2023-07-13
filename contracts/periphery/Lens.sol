// SPDX-License-Identifier: MIT
pragma solidity 0.8.x;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {SafeERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import {OrderLib} from "../OrderLib.sol";
import {TWAP} from "../TWAP.sol";

/**
 * Helper contract to allow for efficient paginated filtered reads of Orders, instead of relying on events
 */
contract Lens {
    using OrderLib for OrderLib.Order;

    TWAP public immutable twap;

    constructor(TWAP _twap) {
        twap = _twap;
    }

    function length() public view returns (uint64) {
        return twap.length();
    }

    function makerOrders(address maker) external view returns (OrderLib.Order[] memory result) {
        uint64[] memory orderIds = twap.makerOrders(maker);

        result = new OrderLib.Order[](orderIds.length);
        for (uint64 i = 0; i < result.length; i++) {
            uint64 id = orderIds[i];
            result[i] = twap.order(id);
        }
    }

    /**
     * returns all orders waiting to be bid on now by the taker, paginated
     * taker: desired taker
     * lastIndex: last order id, start with length-1
     * pageSize: size of iteration restricted by block gas limit. 2500 is measured to be < 15m gas
     */
    function takerBiddableOrders(
        address taker,
        uint64 lastIndex,
        uint64 pageSize
    ) external view returns (OrderLib.Order[] memory result) {
        OrderLib.Order[] memory orders = paginated(lastIndex, pageSize);
        uint64 count = 0;
        uint32 stale = twap.STALE_BID_SECONDS();

        for (uint64 i = 0; i < orders.length; i++) {
            uint64 id = lastIndex - i;
            if (block.timestamp < twap.status(id)) {
                OrderLib.Order memory o = twap.order(id);
                if (
                    block.timestamp > o.filled.time + o.ask.fillDelay &&
                    (o.bid.taker != taker || block.timestamp > o.bid.time + stale) &&
                    o.hasAllowance(address(twap))
                ) {
                    orders[count] = o;
                    count++;
                }
            }
        }

        result = new OrderLib.Order[](count);
        for (uint64 i = 0; i < count; i++) {
            result[i] = orders[i];
        }
    }

    /**
     * returns all orders waiting to be filled now by the taker, paginated
     * taker: desired taker
     * lastIndex: last order id, start with length-1
     * pageSize: size of iteration restricted by block gas limit. 2500 is measured to be < 15m gas
     */
    function takerFillableOrders(
        address taker,
        uint64 lastIndex,
        uint64 pageSize
    ) external view returns (OrderLib.Order[] memory result) {
        OrderLib.Order[] memory orders = paginated(lastIndex, pageSize);
        uint64 count = 0;

        for (uint64 i = 0; i < orders.length; i++) {
            uint64 id = lastIndex - i;
            if (block.timestamp < twap.status(id)) {
                OrderLib.Order memory o = twap.order(id);
                if (
                    o.bid.taker == taker &&
                    block.timestamp > o.bid.time + o.ask.bidDelay &&
                    o.hasAllowance(address(twap))
                ) {
                    orders[count] = o;
                    count++;
                }
            }
        }

        result = new OrderLib.Order[](count);
        for (uint64 i = 0; i < count; i++) {
            result[i] = orders[i];
        }
    }

    function paginated(uint64 lastIndex, uint64 pageSize) private view returns (OrderLib.Order[] memory) {
        require(lastIndex < length(), "Lens:paginated:lastIndex");
        return new OrderLib.Order[](Math.min(lastIndex + 1, pageSize));
    }
}
