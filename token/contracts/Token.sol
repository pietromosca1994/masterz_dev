// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import './interfaces/IBlackList.sol';

contract Token is ERC20, Ownable{
    IBlackList public blacklistcontract;

	constructor(string memory tokenName, string memory tokenSym, address blAddress) ERC20(tokenName, tokenSym){
        blacklistcontract = IBlackList(blAddress);
    }

	function mint(address account, uint256 amount) external onlyOwner {
		_mint(account, amount);
	}

	function burn(uint256 amount) external {
		_burn(msg.sender, amount);
	}

	function _beforeTokenTransfer(address from, address to, uint256 amount) internal view override {
        amount;
        // require(blacklist.getBlackListStatus(from) || blacklist.getBlackListStatus(to), "BlackListed addresses");     
        if (blacklistcontract.getBlackListStatus(from) || blacklistcontract.getBlackListStatus(to)) {
            revert();
        } 
	}

	function _afterTokenTransfer(address from, address to, uint256 amount) internal override {

	} 

    function insertInBlackList (address user) external onlyOwner{
        blacklistcontract.addBlackList(user, address(this));
    }

    function removeFromBlackList (address user) external onlyOwner{
        blacklistcontract.removeBlackList(user, address(this));
    }
}