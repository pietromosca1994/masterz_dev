# Game Items
## Description
An exmaple of ERC1155 toekn

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
[ERC1155 Openzeppelin](https://docs.openzeppelin.com/contracts/3.x/erc1155)  

