const { expect } = require("chai");
const { ethers } = require("hardhat");

const ethUsdContract = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"         // https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd
const azukiPriceContract = "0xa8b9a447c73191744d5b79bce864f343455e1150"     // https://data.chain.link/ethereum/mainnet/nft-floor-prices/coinbase-azuki-floor-price-eth

describe("Wallet", function () {
    let Token;
    let token;
    let Wallet;
    let wallet;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        // Deploy the Token contract
        Token = await ethers.getContractFactory("Token");
        token = await Token.connect(owner).deploy("MyToken", "MTK", 1000000);

        // Deploy the Wallet contract
        Wallet = await ethers.getContractFactory("Wallet");
        wallet = await Wallet.connect(owner).deploy(
        ethUsdContract,
        azukiPriceContract
        );
    });

    it("Should register user deposits in ETH", async function () {
        const depositAmount = ethers.utils.parseEther("1");
        await wallet.connect(addr1).depositEth({ value: depositAmount });
        expect(await wallet.getUserEthDeposits(addr1.address)).to.equal(depositAmount);
    });

    it("Should convert USD to ETH correctly", async function () {
        // convert USD to ETH
        const usdAmount = 10000*10**2; // with 2 decimals
        const expectedEthAmount = 4.82; 
        const convertedEthAmount = await wallet.convertUSDInEth(usdAmount);
        const convertedEthAmountNumber = parseFloat(ethers.utils.formatUnits(convertedEthAmount, "ether"));

        expect(convertedEthAmountNumber).to.be.closeTo(expectedEthAmount, 0.1);
    });

    it("Should convert ETH to USD correctly", async function () {
        // convert ETH to USD
        ethAmount=ethers.utils.parseEther("1")
        const expectedUSDAmount = 2070*10**2; 
        const convertedUSDAmount = await wallet.convertEthInUSD(ethAmount);

        expect(convertedUSDAmount).to.be.closeTo(expectedUSDAmount, 100*10**2);
    });

    it("Should convert NFT to USD correctly", async function () {
        // convert NFT amount to USD
        const expectedEthAmount = ethers.utils.parseEther("4.64"); 
        const convertedUSDAmount = await wallet.convertNFTPriceInUSD();
        const convertedEthAmount = await wallet.convertUSDInEth(convertedUSDAmount)

        expect(convertedEthAmount).to.be.closeTo(expectedEthAmount, ethers.utils.parseEther("0.1"));
    });

    it("Should convert USD to NFT amount correctly", async function () {

        // convert USD to NFT amount
        const usdAmount = 10000*10**2; // with 2 decimals
        const expectedNFTAmount = 1;
        const NFTAmount = await wallet.convertUSDInNFTAmount(usdAmount);

        expect(NFTAmount).to.be.equal(expectedNFTAmount);
    });


    // it("Should transfer ETH amount on buy", async function () {
    //     const nftNumber=1;
    //     const nftPrice=100; //USD

    //     const addr1BalancePre= await ethers.provider.getBalance(addr1.address);
    //     console.log("balance pre: "+addr1BalancePre)
        
    //     await wallet.connect(addr1).depositEth({ value: ethers.utils.parseEther("2") });
    //     await wallet.connect(addr1).transferEthAmountOnBuy(nftNumber);
        
    //     const addr1BalancePost= await ethers.provider.getBalance(addr1.address);
    //     console.log("balance post: "+addr1BalancePost)


    //     const convertedEthAmount = await wallet.convertUSDInEth(nftNumber*nftPrice*10*2);

    //     expect(convertedEthAmount).to.be.closeTo(addr1BalancePre.sub(addr1BalancePost), 1);
    // });

//   it("Should register user deposits in tokens", async function () {
//     const Token = await ethers.getContractFactory("YourTokenContract"); // Replace with the actual contract name
//     const token = await Token.deploy();
//     const depositAmount = ethers.utils.parseUnits("100", 18); // Mocked value, replace with the actual value
//     await token.connect(addr1).approve(wallet.address, depositAmount);
//     await wallet.connect(addr1).userDeposits(token.address, depositAmount);
//     expect(await wallet.userTokenDeposits(addr1.address, token.address)).to.equal(depositAmount);
//   });

    // it("Should convert token to USD correctly", async function () {
    //     const depositAmount = ethers.utils.parseUnits("10000", 0);
    //     console.log("depositAmount: " + depositAmount);

    //     await token.connect(owner).mint(addr1.address, 50000);
    //     await token.connect(addr1).approve(wallet.address, depositAmount);
    //     await wallet.connect(addr1).userDeposits(token.address, depositAmount);
        
    //     // check that the deposit happened
    //     const addr1Deposits=await wallet.getUserDeposits(addr1.address, token.address);
    //     console.log("addr1Deposits: " + addr1Deposits);

    //     const expectedUsdAmount = 16.52*10*2;
    //     const convertedUsdAmount = await wallet.convertNFTPriceInETH(token.address, addr1.address);
    //     console.log("convertedUsdAmount: " + convertedUsdAmount);
    //     // expect(convertedUsdAmount).to.be.closeTo(expectedUsdAmount, 0.1); // Adjust the tolerance as needed
    // });

//   it("Should transfer token amount on buy", async function () {
//     const Token = await ethers.getContractFactory("YourTokenContract"); // Replace with the actual contract name
//     const token = await Token.deploy();
//     await token.connect(addr1).mint(addr1.address, ethers.utils.parseUnits("200", 18)); // Mocked value, replace with the actual value
    
//     await token.connect(addr1).approve(wallet.address, ethers.utils.parseUnits("100", 18));
//     await wallet.connect(addr1).userDeposits(token.address, ethers.utils.parseUnits("100", 18));
    
//     await wallet.connect(addr1).transferTokenAmountOnBuy(token.address, 1);
//     const ownerBalance = await token.balanceOf(owner.address);
//     expect(ownerBalance).to.equal(ethers.utils.parseUnits("50", 18)); // Mocked value, replace with the actual expected value
//   });
});
