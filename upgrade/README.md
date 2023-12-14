# UPgreadable Contract 
## Description
CLone Token Factory of an upgreadeable ERC721 Token

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
[Openzeppelin Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy)