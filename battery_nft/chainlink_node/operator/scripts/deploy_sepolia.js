const { ethers} = require("hardhat");
require('dotenv').config()

const sepolia_link_token_contract='0x779877A7B0D9E8603169DdbD7836e478b4624789'

async function main() {
    const owner_address=process.env.ADDRESS
    console.log("Owner address: "+owner_address);

    const MyOperator = await ethers.getContractFactory("MyOperator");
    const myOperator = await MyOperator.deploy(sepolia_link_token_contract, owner_address);
    console.log("MyOperator deployed @ "+ await myOperator.address);
    console.log()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Owner address: 0xB01D64120C84C8a574a9588b79A006316AB625b6
// MyOperator deployed @ 0xDA1c45672fc425771D3065b6B7cAF59A66051123