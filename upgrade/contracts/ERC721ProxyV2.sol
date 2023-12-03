// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./ERC721ProxyV1.sol";

// https://dev.to/abhikbanerjee99/understanding-upgradeable-smart-contracts-hands-on-1c00

contract ERC721ProxyV2 is ERC721ProxyV1{

    function reInitialize(string memory name, string memory symbol, address owner) public reinitializer(2) {
        __ERC721_init(name, symbol);
        __ERC721URIStorage_init();
         __Ownable_init(owner);
         __UUPSUpgradeable_init();
        version=2;
    }
}