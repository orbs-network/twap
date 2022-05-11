// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./Interfaces.sol";

contract Quoter {
    IRouter public immutable ROUTER;
    address[][] public paths;

    constructor(address router) {
        ROUTER = IRouter(router);
    }

    function prepare(address[][] memory _paths) public {
        paths = _paths;
    }

    function bestPath(uint256 amountIn) public view returns (uint256 index, uint256 maxOut) {
        index = 0;
        maxOut = 0;

        for (uint256 i = 0; i < paths.length; i++) {
            uint256[] memory amounts = ROUTER.getAmountsOut(amountIn, paths[i]);
            uint256 amountOut = amounts[amounts.length - 1];

            if (amountOut > maxOut) {
                maxOut = amountOut;
                index = i;
            }
        }

        require(maxOut > 1, "E1");
    }
}
