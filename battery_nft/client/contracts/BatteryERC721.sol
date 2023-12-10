// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./MyChainlinkClient.sol";

// import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract BatteryERC721 is Initializable, UUPSUpgradeable, ERC721Upgradeable, ERC721URIStorageUpgradeable, OwnableUpgradeable{
    using Chainlink for Chainlink.Request;

    uint public version;
    string public uuid;
    MyChainlinkClient public client;

    mapping(string => uint256) public metadata;

    function initialize(string memory name_, string memory symbol_, address owner_, string memory uuid_, address oracle_) public initializer {
        __ERC721_init(name_, symbol_);
        __ERC721URIStorage_init();
        __Ownable_init(owner_);
        __UUPSUpgradeable_init();
        version=1;
        // oracle=oracle_;
        client=MyChainlinkClient(oracle_);

        // initialize NFT properties
        uuid=uuid_;
        initMetadata();
    }

    function initMetadata() internal{
        metadata['soc']=0;
        metadata['soh']=0;
        metadata['v']=0;
        metadata['fec']=0;
    }

    function mint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721Upgradeable, ERC721URIStorageUpgradeable) returns (string memory){
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override (ERC721Upgradeable, ERC721URIStorageUpgradeable) returns (bool){
        return super.supportsInterface(interfaceId);
    }  
    
    function _authorizeUpgrade(address newImplementation) internal onlyOwner override{}

    function updateState() public {
        client.requestState(uuid);
        metadata['soc']=client.metadata('soc');
    }

}