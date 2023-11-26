// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./PriceConsumerV3.sol";

contract Wallet is Ownable{
    uint public constant usdDecimals=2;
    uint public  constant nftDecimals=18;
    uint public nftPrice;          // in ETH
    uint public ownerEthAmountToWithdraw;
    uint public ownerTokenAmountToWithdraw;

    address public oracleEthUsdPrice;
    address public oracleTokenEthPrice;

    PriceConsumerV3 public ethUsdContract;
    PriceConsumerV3 public tokenEthContract;

    mapping (address => uint256)  public userEthDeposits;
    mapping (address => mapping(address => uint256)) public userTokenDeposits;

    constructor (address clEthUsd, address clTokenUsd){
        oracleEthUsdPrice=clEthUsd;
        oracleTokenEthPrice=clTokenUsd;

        ethUsdContract = new PriceConsumerV3(oracleEthUsdPrice);
        tokenEthContract = new PriceConsumerV3(oracleTokenEthPrice);
    }

    function depositEth() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        userEthDeposits[msg.sender] += msg.value;
    }

    function getNFTPrice() external view returns (uint256){
        uint256 price;
        int iPrice;
        AggregatorV3Interface nftOraclePrice = AggregatorV3Interface(oracleTokenEthPrice);
        (, iPrice, , ,)=nftOraclePrice.latestRoundData();
        price=uint256(iPrice);
        return price;
    }

    function convertUSDInEth(uint usdAmount) public view returns (uint) {
        uint ethPriceDecimals = ethUsdContract.getPriceDecimals();
        uint ethPrice = uint (ethUsdContract.getLatestPrice());
        uint mulDecs = 18 + ethPriceDecimals - usdDecimals;
        uint convertAmountInEth = usdAmount * (10 ** mulDecs) / ethPrice;
        return convertAmountInEth;
    }

    function convertEthInUSD(uint ethAmount) public view returns (uint){
        uint ethPriceDecimals = ethUsdContract.getPriceDecimals();
        uint ethPrice=uint(ethUsdContract.getLatestPrice());
        uint divDecs=18+ethPriceDecimals-usdDecimals;
        uint userUSDDeposit=ethAmount*ethPrice/(10 ** divDecs);
        return userUSDDeposit;
    }

    function userDeposits(address token, uint256 amount) external {
        SafeERC20.safeTransferFrom(IERC20(token), msg.sender, address(this), amount);
        userTokenDeposits[msg.sender][token]+=amount;
    }

    function convertNFTPriceInUSD() public view returns (uint) {
        uint tokenPriceDecimals = tokenEthContract.getPriceDecimals();
        uint tokenPrice = uint (tokenEthContract.getLatestPrice());
        

        uint ethPriceDecimals = ethUsdContract.getPriceDecimals();
        uint ethPrice=uint(ethUsdContract.getLatestPrice());
        uint divDecs = tokenPriceDecimals + ethPriceDecimals - usdDecimals;

        uint tokenUSDPrice = tokenPrice * ethPrice/ (10**divDecs);
        return tokenUSDPrice;
    }

    function convertUSDInNFTAmount(uint usdAmount) public view returns (uint) {
        uint tokenPriceDecimals = tokenEthContract.getPriceDecimals();
        uint tokenPrice = uint (tokenEthContract.getLatestPrice());

        uint ethPriceDecimals = ethUsdContract.getPriceDecimals();
        uint ethPrice = uint (ethUsdContract.getLatestPrice());


        uint mulDecs =  tokenPriceDecimals + ethPriceDecimals - usdDecimals;
        uint convertAmountInETH = usdAmount * (10 ** mulDecs) / ethPrice;

        uint convertETHInTokens=convertAmountInETH/tokenPrice;

        // uint totalCosts=convertETHInTokens*tokenPrice/(ethPrice*10**8);
        // uint remainingUSD=usdAmount - totalCosts;
        
        return convertETHInTokens;
    }

    function getUserTokenDeposits(address user, address token) public view returns(uint256){
        return userTokenDeposits[user][token];
    }
        
    function getUserEthDeposits(address user) public view returns(uint256){
        return userEthDeposits[user];
    }


    // function transferTokenAmountOnBuy(address token, uint nftNumber) public {
    //     uint calcTotalUSDAmount=nftPrice*nftNumber*(10**2);
    //     uint tokenAmountForBuying=convertUSDInToken(calcTotalUSDAmount);
    //     require (userTokenDeposits[msg.sender][token]>=tokenAmountForBuying, "not enough deposits by the user");
    //     ownerTokenAmountToWithdraw+=tokenAmountForBuying;
    //     userTokenDeposits[msg.sender][token]-=tokenAmountForBuying;       
    // }

    // function transferEthAmountOnBuy(uint nftNumber) public {
    //     uint calcTotalUSDAmount=nftPrice*nftNumber*(10**2);
    //     uint ethAmountForBuying=convertUSDInEth(calcTotalUSDAmount);
    //     require (userEthDeposits[msg.sender]>=ethAmountForBuying, "not enough deposits by the user");
    //     ownerEthAmountToWithdraw+=ethAmountForBuying;
    //     userEthDeposits[msg.sender]-=ethAmountForBuying;
    // }

}


