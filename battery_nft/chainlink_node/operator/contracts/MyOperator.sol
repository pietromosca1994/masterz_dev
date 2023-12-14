// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@chainlink/contracts/src/v0.7/Operator.sol";

contract MyOperator is Operator {
    uint public version;
    
    constructor(address link, address owner) Operator(link, owner) {
        version=1;
    }
    
    function getVersion() public view returns (uint){
        return version;
    }
}
