const { expect } = require("chai");
const { ethers } = require("hardhat");

const ethUsdContract = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"         // https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd
const azukiPriceContract = "0xa8b9a447c73191744d5b79bce864f343455e1150"     // https://data.chain.link/ethereum/mainnet/nft-floor-prices/coinbase-azuki-floor-price-eth

describe("Wallet", function () {
    let Token;
    let token;
    let Wallet;
    let wallet;
    let PriceConsumerV3;
    let priceConsumer;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        // Deploy the Token contract
        Token = await ethers.getContractFactory("Token");
        token = await Token.connect(deployer).deploy("MyToken", "MTK", 1000000);

        // Deploy the Wallet contract
        Wallet = await ethers.getContractFactory("Wallet");
        wallet = await Wallet.connect(owner).deploy(
        ethUsdContract,
        azukiPriceContract
        );

        // Deploy PriceConsumerV3
        PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
        priceConsumer = await PriceConsumerV3.connect(owner).deploy(
        ethUsdContract,
        );

    });

    it("Should register user deposits in ETH", async function () {
        const depositAmount = ethers.parseEther("1");
        await wallet.connect(addr1).depositEth({ value: depositAmount });
        expect(await wallet.userEthDeposits(addr1.address)).to.equal(depositAmount);
    });


//   it("Should register user deposits in ETH", async function () {
//     const depositAmount = ethers.parseEther("1");
//     await wallet.connect(addr1).depositEth({ value: depositAmount });
//     expect(await wallet.userEthDeposits(addr1.address)).to.equal(depositAmount);
//   });

//   it("Should convert USD to ETH correctly", async function () {
//     const usdAmount = 100;
//     const expectedEthAmount = 0.02; // Mocked value, replace with the actual expected value
//     const convertedEthAmount = await wallet.convertUSDInEth(usdAmount);
//     expect(convertedEthAmount).to.be.closeTo(expectedEthAmount, 0.0001);
//   });

//   it("Should transfer ETH amount on buy", async function () {
//     await wallet.connect(addr1).depositEth({ value: ethers.utils.parseEther("2") });
//     await wallet.connect(addr1).transferEthAmountOnBuy(1);
//     const ownerBalance = await ethers.provider.getBalance(owner.address);
//     expect(ownerBalance).to.equal(ethers.utils.parseEther("0.02")); // Mocked value, replace with the actual expected value
//   });

//   it("Should register user deposits in tokens", async function () {
//     const Token = await ethers.getContractFactory("YourTokenContract"); // Replace with the actual contract name
//     const token = await Token.deploy();
//     const depositAmount = ethers.utils.parseUnits("100", 18); // Mocked value, replace with the actual value
//     await token.connect(addr1).approve(wallet.address, depositAmount);
//     await wallet.connect(addr1).userDeposits(token.address, depositAmount);
//     expect(await wallet.userTokenDeposits(addr1.address, token.address)).to.equal(depositAmount);
//   });

//   it("Should convert token to USD correctly", async function () {
//     const Token = await ethers.getContractFactory("YourTokenContract"); // Replace with the actual contract name
//     const token = await Token.deploy();
//     const depositAmount = ethers.utils.parseUnits("100", 18); // Mocked value, replace with the actual value
//     await token.connect(addr1).approve(wallet.address, depositAmount);
//     await wallet.connect(addr1).userDeposits(token.address, depositAmount);
    
//     const expectedUsdAmount = 50; // Mocked value, replace with the actual expected value
//     const convertedUsdAmount = await wallet.convertTokenInUSD(token.address, addr1.address);
//     expect(convertedUsdAmount).to.be.closeTo(expectedUsdAmount, 0.1); // Adjust the tolerance as needed
//   });

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
