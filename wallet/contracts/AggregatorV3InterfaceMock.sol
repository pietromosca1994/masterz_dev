// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract AggregatorV3InterfaceMock is AggregatorV3Interface {
    function decimals() external view returns (uint8){
        return uint8(1);
    }

    function description() external view returns (string memory){
        return (string(''));
    }

    function version() external view returns (uint256){
        return (uint256(3));
    }

    function getRoundData(uint80 _roundId)
        external
        view
        returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
        )
        {
            return (1, 2000, 1638248170, 1638248180, 1);
        }

    function latestRoundData()
        external
        view
        returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
        )
        {
            return (1, 2000, 1638248170, 1638248180, 1);
        }

    function getPriceDecimals() public view returns (uint) {
        return uint(1);
    }
}