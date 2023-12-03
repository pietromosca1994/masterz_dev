require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/hardhat-chainlink");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",

  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_RPC_URL,
        blockNumber: 18656489
      }
    },
  }
};


