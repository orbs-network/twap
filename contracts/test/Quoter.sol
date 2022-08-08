// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "../IExchange.sol";

contract Quoter {
    IExchange public immutable exchange;
    address[][] public paths;

    constructor(address _exchange) {
        exchange = IExchange(_exchange);
    }

    function prepare(address[][] memory _paths) public {
        paths = _paths;
    }

    function bestPath(uint256 amountIn) public view returns (uint256 index, uint256 amountOut) {
        index = 0;
        amountOut = 0;

        for (uint256 i = 0; i < paths.length; i++) {
            bytes memory data = abi.encode(paths[i]);
            uint256 amount = exchange.getAmountOut(amountIn, data);
            if (amount > amountOut) {
                index = i;
                amountOut = amount;
            }
        }

        require(amountOut > 1, "E1");
    }
}
