// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/proxy/Clones.sol";
import './ERC721ProxyV1.sol';

contract CloneTokenFactory {
    address immutable tokenImplementation;

    event TokenCreated(address indexed owner, address indexed tokenAddress);

    constructor(address _tokenImplementation) {
        tokenImplementation = _tokenImplementation;
    }

    function getTokenImplementation() public view returns (address) {
        return tokenImplementation;
    }

    function createToken(string calldata name, string calldata symbol, address owner) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        ERC721ProxyV1(clone).initialize(name, symbol, owner);

        emit TokenCreated(owner, clone);

        return clone;
    }

}