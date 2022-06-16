// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Interfaces.sol";
import "./DOTC.sol";
import "./OrderLib.sol";

contract Taker is Ownable {
    using SafeERC20 for ERC20;

    DOTC public immutable dotc;
    IExchange public immutable exchange;

    constructor(
        address _owner,
        address _dotc,
        address _exchange
    ) {
        transferOwnership(_owner);
        dotc = DOTC(_dotc);
        exchange = IExchange(_exchange);
    }

    function bid(uint256 id, address[] calldata path) external onlyOwner {
        dotc.bid(id, address(exchange), path);
    }

    function fill(uint256 id) external onlyOwner {
        dotc.fill(id);
    }
}
