require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/hardhat-chainlink");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  
  networks: {
    goerli: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};


