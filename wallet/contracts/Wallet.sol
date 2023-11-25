// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./PriceConsumerV3.sol";

contract Wallet is Ownable{
    uint public constant usdDecimals=2;
    uint public  constant tokenDecimals=18;
    uint public constant nftPrice=100; // in USD
    uint public ownerEthAmountToWithdraw;
    uint public ownerTokenAmountToWithdraw;

    address public oracleEthUsdPrice;
    address public oracleTokenUsdPrice;

    PriceConsumerV3 public ethUsdContract;
    PriceConsumerV3 public tokenUsdContract;

    mapping (address => uint256)  public userEthDeposits;
    mapping (address => mapping(address => uint256)) public userTokenDeposits;

    constructor (address clEthUsd, address clTokenUsd){
        oracleEthUsdPrice=clEthUsd;
        oracleTokenUsdPrice=clTokenUsd;

        ethUsdContract = new PriceConsumerV3(oracleEthUsdPrice);
        tokenUsdContract = new PriceConsumerV3(oracleTokenUsdPrice);
    }

    receive() external payable {
        registerUserDeposit(msg.sender, msg.value);
    }

    function registerUserDeposit(address sender, uint256 value) internal {
        userEthDeposits[sender]+=value;
    }

    function convertUSDInEth(uint usdAmount) public view returns (uint) {
        uint ethPriceDecimals = ethUsdContract.getPriceDecimals();
        uint ethPrice = uint (ethUsdContract.getLatestPrice());
        uint mulDecs = 18 + ethPriceDecimals - usdDecimals;
        uint convertAmountInEth = usdAmount * (10 ** mulDecs) / ethPrice;
        return convertAmountInEth;
}
    function transferEthAmountOnBuy(uint nftNumber) public {
        uint calcTotalUSDAmount=nftPrice*nftNumber*(10**2);
        uint ethAmountForBuying=convertUSDInEth(calcTotalUSDAmount);
        require (userEthDeposits[msg.sender]>=ethAmountForBuying, "not enough deposits by the user");
        ownerEthAmountToWithdraw+=ethAmountForBuying;
        userEthDeposits[msg.sender]-=ethAmountForBuying;
    }

    function userDeposits(address token, uint256 amount) external {
        SafeERC20.safeTransferFrom(IERC20(token), msg.sender, address(this), amount);
        userTokenDeposits[msg.sender][token]+=amount;
    }

    function convertTokenInUSD(address token, address user) public view returns (uint) {
        uint tokenPriceDecimals = tokenUsdContract.getPriceDecimals();
        uint tokenPrice = uint (tokenUsdContract.getLatestPrice());
        uint divDecs = 18 + tokenPriceDecimals - usdDecimals;
        uint userUSDDeposit = userTokenDeposits[user][token] * tokenPrice / (10 ** divDecs);
        return userUSDDeposit;
    }

    function convertUSDInToken(uint usdAmount) public view returns (uint) {
        uint tokenPriceDecimals = tokenUsdContract.getPriceDecimals();
        uint tokenPrice = uint (tokenUsdContract.getLatestPrice());
        uint mulDecs = 18 + tokenPriceDecimals - usdDecimals;
        uint convertAmountInTokens = usdAmount * (10 ** mulDecs) / tokenPrice;
        return convertAmountInTokens;
    }

    function transferTokenAmountOnBuy(address token, uint nftNumber) public {
        uint calcTotalUSDAmount=nftPrice*nftNumber*(10**2);
        uint tokenAmountForBuying=convertUSDInToken(calcTotalUSDAmount);
        require (userTokenDeposits[msg.sender][token]>=tokenAmountForBuying, "not enough deposits by the user");
        ownerTokenAmountToWithdraw+=tokenAmountForBuying;
        userTokenDeposits[msg.sender][token]-=tokenAmountForBuying;       
    }

}


