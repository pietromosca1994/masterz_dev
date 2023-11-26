// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3{
    AggregatorV3Interface internal priceFeed;

    constructor(address clOracleAddress){
        priceFeed=AggregatorV3Interface(clOracleAddress);
    }

    function getLatestPrice() public view returns (int) {
        (
            /* uint80 roundId */, 
            int256 answer, 
            /* uint256 startedAt */, 
            uint256 updatedAt , 
            /* uint80 answeredInRound */
        )=priceFeed.latestRoundData();
        require(updatedAt > 0, "Round not complete");
        return answer;
    }

    function getPriceDecimals() public view returns (uint) {
        return uint(priceFeed.decimals());
    }
}