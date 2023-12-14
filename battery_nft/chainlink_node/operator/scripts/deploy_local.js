const { ethers} = require("hardhat");

const sepolia_link_token_contract='0x779877A7B0D9E8603169DdbD7836e478b4624789'

async function main() {
  [owner, addr1, addr2] = await ethers.getSigners();
  console.log("Owner address:   "+owner.address);
  const MyOperator = await ethers.getContractFactory("MyOperator");
  const myOperator = await MyOperator.deploy(sepolia_link_token_contract, owner.address);
  console.log("MyOperator deployed @ "+ await myOperator.address);
  console.log()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});