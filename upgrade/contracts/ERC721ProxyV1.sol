// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract ERC721ProxyV1 is Initializable, UUPSUpgradeable,  ERC721Upgradeable, ERC721URIStorageUpgradeable, OwnableUpgradeable{
    uint version;
    
    function initialize(string memory name, string memory symbol, address owner) public initializer {
        __ERC721_init(name, symbol);
        __ERC721URIStorage_init();
        __Ownable_init(owner);
        __UUPSUpgradeable_init();
        version=1;
    }

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    function getVersion() public view returns (uint) {
        return version;
    }

    // function _burn(uint256 tokenId)
    //     internal
    //     override(ERC721Upgradeable)
    // {
    //     super._burn(tokenId);
    // }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }  
    
    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
}
