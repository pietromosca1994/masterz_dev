const { ethers} = require("hardhat");
require('dotenv').config()

const sepolia_link_token_contract='0x779877A7B0D9E8603169DdbD7836e478b4624789'

async function main() {
    const owner_address=process.env.ADDRESS
    console.log("Owner address: "+owner_address);

    const ATestnetConsumer = await ethers.getContractFactory("ATestnetConsumer");
    const aTestnetConsumer = await ATestnetConsumer.deploy();
    console.log("ATestnetConsumer deployed @ "+ await aTestnetConsumer.address);
    console.log()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Owner address: 0xB01D64120C84C8a574a9588b79A006316AB625b6
// ATestnetConsumer deployed @ 0x9E92556547641bcBA65566441D2f54acb9cBCc68