// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Author: pietromosca1994
contract GameItems is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor() public ERC1155("https://orange-widespread-guineafowl-358.mypinata.cloud/ipfs/QmdHmnT9Mrfb4mNSkeLj2R6utEJCzkDp41qZrJTiHdQSBj/metadata_id{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");
        _mint(msg.sender, SILVER, 10**27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10**9, "");
        _mint(msg.sender, SHIELD, 10**9, "");
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public onlyOwner{
        _mint(to, id, amount, data);
    }

    function burn(address from, uint256 id, uint256 amount) public onlyOwner{
        _burn(from, id, amount);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner{
        _mintBatch(to, ids, amounts, data);
    }

    function burnBatch(address from, uint256[] memory ids, uint256[] memory amounts) public onlyOwner{
        _burnBatch(from, ids, amounts);
    }

    function setURI(string memory newuri) public onlyOwner{
        _setURI(newuri);
    }

}