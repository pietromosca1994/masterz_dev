// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import './interfaces/IBlackList.sol';

contract BlackList is Ownable, IBlackList{
    mapping (address => bool) public allowedTokens;
    mapping (address => bool) public isBlackListed;

    // event DestroyedBlackFunds(address _blackListedUser, uint _balance);

    event AddedBlackList(address _user);

    event RemovedBlackList(address _user);

    constructor() {}

    function allowedToken(address token) external onlyOwner{
        if (token == address(0)){
            revert();
        }
        allowedTokens[token]=true;
    }

    function getAllowedTokenStatus(address token) external view returns (bool) {
        return allowedTokens[token];
    }

    /////// Getters to allow the same blacklist to be used also by other contracts (including upgraded Tether) ///////
    function getBlackListStatus(address _maker) external view returns (bool) {
        return isBlackListed[_maker];
    }

    // function getOwner() external view returns (address) {
    //     return owner();
    // }
    
    function addBlackList (address _evilUser, address token) external{
        if (!allowedTokens[token]){
            revert();
        }
        isBlackListed[_evilUser] = true;
        emit AddedBlackList(_evilUser);
    }

    function removeBlackList (address _clearedUser, address token) external{
        if (!allowedTokens[token]){
            revert();
        }
        isBlackListed[_clearedUser] = false;
        emit RemovedBlackList(_clearedUser);
    }

    // function destroyBlackFunds (address _blackListedUser) public onlyOwner {
    //     require(isBlackListed[_blackListedUser]);
    //     uint dirtyFunds = balanceOf(_blackListedUser);
    //     balances[_blackListedUser] = 0;
    //     _totalSupply -= dirtyFunds;
    //     DestroyedBlackFunds(_blackListedUser, dirtyFunds);
    // }

}