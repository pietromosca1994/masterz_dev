// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBlackList {
    function allowedToken(address token) external;
    function getBlackListStatus(address _maker) external view returns (bool);
    function addBlackList (address _evilUser, address token) external;
    function removeBlackList (address _clearedUser, address token) external;
}

