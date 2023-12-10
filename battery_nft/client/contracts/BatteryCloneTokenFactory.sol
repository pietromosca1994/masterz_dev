// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./BatteryERC721.sol";

contract ERC721Factory is Initializable, OwnableUpgradeable, UUPSUpgradeable{
    address[] public deployedTokens;

    event TokenCreated(address indexed owner, address indexed tokenAddress);

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function createBatteryERC721(string memory name_, string memory symbol_, string memory uuid_, address oracle_) external onlyOwner {
        BatteryERC721 newToken = new BatteryERC721();
        newToken.initialize(name_, symbol_, msg.sender, uuid_, oracle_);
        deployedTokens.push(address(newToken));

        emit TokenCreated(msg.sender, address(newToken));
    }

    function getDeployedTokens() external view returns (address[] memory) {
        return deployedTokens;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
