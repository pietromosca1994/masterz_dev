const { expect } = require("chai");
const { ethers } = require("hardhat");

// https://blog.chain.link/testing-chainlink-smart-contracts/

const ethUsdContract = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"         // https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd
const azukiPriceContract = "0xa8b9a447c73191744d5b79bce864f343455e1150"     // https://data.chain.link/ethereum/mainnet/nft-floor-prices/coinbase-azuki-floor-price-eth

describe("PriceConsumerV3", function () {
    let PriceConsumerV3;
    let priceConsumerV3;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        // Deploy PriceConsumerV3 contract
        PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
        priceConsumerV3 = await PriceConsumerV3.connect(owner).deploy(
            ethUsdContract,
        );
    });

    it("Should get the latest price", async function () {
        const latestPrice = await priceConsumerV3.getLatestPrice();
        expect(latestPrice).to.not.be.undefined;
        expect(latestPrice.gt(0)).to.be.true;

        console.log('Latest price ETH/USD: '+latestPrice);
    });

    it("Should get the price decimals", async function () {
        const decimals = await priceConsumerV3.getPriceDecimals();
        expect(decimals).to.not.be.undefined;
        expect(decimals.gt(0)).to.be.true;

        console.log('Price decimals ETH/USD: '+decimals);
    });

  });