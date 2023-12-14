// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract MockMyChainlinkClient {
    mapping(string => uint256) public metadata;

    function requestState(string memory uuid) public returns (uint256) {
        metadata['soc']=50;
        return metadata['soc'];
    }
}