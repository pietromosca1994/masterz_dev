# Wallet
## Description
Implementation of a wallet wit currency conversion using a Chainlink oracle.

## Getting Started
.Env
```bash 
INFURA_API_KEY=
ADDRESS=
PRIVATE_KEY=
ETHERSCAN_API_KEY=
```

Run Tests
```shell
npx hardhat test
```

Deploy on Local Testnet
```shell 
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
```

Deploy on Testnet
- network_name: network name e.g. sepolia

```shell
npx hardhat run --network <network_name> scripts/deploy.js 
```

Verify the contract ()
- network_name: network name e.g. sepolia
- address: contract address from the deployment

``` shell
npx hardhat verify --network <network_name> <address>
```

## References 
[Chainlink](https://chain.link)  
[ETH/USD contract](https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd)  
[Azuki Contract](https://data.chain.link/ethereum/mainnet/nft-floor-prices/coinbase-azuki-floor-price-eth)