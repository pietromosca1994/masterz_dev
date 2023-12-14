// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable{
    constructor(string memory tokenName, string memory tokenSym,  uint256 initialSupply) ERC20(tokenName, tokenSym){
        _mint(msg.sender, initialSupply);
    }

    function mint(address account, uint256 amount) external onlyOwner {
		_mint(account, amount);
	}

	function burn(uint256 amount) external onlyOwner{
		_burn(msg.sender, amount);
	}
}