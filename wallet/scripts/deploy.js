const ethUsdContract = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419" // https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd
const azukiPriceContract = "0xa8b9a447c73191744d5b79bce864f343455e1150" // https://data.chain.link/ethereum/mainnet/nft-floor-prices/coinbase-azuki-floor-price-eth

async function main() {
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy("Token", "TT1", 10000000);
  console.log("Token deployed @ "+ await token.getAddress());

  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy(ethUsdContract, azukiPriceContract);
  console.log("Wallet deployed @ "+ await wallet.getAddress());

  const PriceConsumerEthUsd = await ethers.getContractFactory("PriceConsumer");
  const priceConsumerEthUsd = await PriceConsumer.deploy(PriceConsumerEthUsd);
  console.log("PriceConsumer ETH/USD deployed @ "+ await priceConsumerEthUsd.getAddress());

  const PriceConsumerAzukiUsd = await ethers.getContractFactory("PriceConsumer");
  const priceConsumerAzukiUsd = await PriceConsumer.deploy(PriceConsumerAzukiUsd);
  console.log("PriceConsumer Azuki/USD deployed @ "+ await priceConsumerAzukiUsd.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
