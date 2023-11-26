# MyNFTERC1155

Run Tests
```shell
npx hardhat test
```

Deploy on Local Testnet
```shell 
npx hardhat node
npx hardhat run --network localhost scripts/deploy.js
```

Deploy on Testnet (<netork_name> e.g. sepolia)
```shell
npx hardhat run scripts/deploy.js --network <network_name>
```

Verify the contract (<netork_name> e.g. sepolia)
``` shell
npx hardhat verify --network <network_name> <address>
```

