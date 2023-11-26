# Wallet

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
<network_name>: network name e.g. sepolia
```shell
npx hardhat run scripts/deploy.js --network <network_name>
```

Verify the contract ()
<network_name>: network name e.g. sepolia
<address> conttract address from the deployment

``` shell
npx hardhat verify --network <network_name> <address>
```