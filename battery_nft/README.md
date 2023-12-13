# Battery NFT
## Description
Example of blockchain based Battery Passport. The battery is Tokenized as a dynamic ERC721 Token with the state of the battery updated thorugh a Chainlink oracle.

## Getting Started
1. Run the chainlink node oracle as described in [README](./chainlink_node/)
2. Deploy the [Operator Contract](./chainlink_node/operator/contracts/MyOperator.sol)
3. Deploy the [Consumer Contract](./client/contracts/BatteryERC721.sol)
4. Fund the Consumer contract with LINK from the [Chainlink Faucet](https://faucets.chain.link)

## References
