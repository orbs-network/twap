// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

/**
 * Augustus Swapper
 * Paraswap main exchange interface
 */
interface IParaswap {
    function getTokenTransferProxy() external view returns (address);
}
