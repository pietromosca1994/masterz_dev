const { ethers} = require("hardhat");
require('dotenv').config()

const sepolia_link_token_contract='0x779877A7B0D9E8603169DdbD7836e478b4624789'
const oracle_contract='0xDA1c45672fc425771D3065b6B7cAF59A66051123'

async function main() {
    const owner_address=process.env.ADDRESS
    console.log("Owner address: "+owner_address);

    const MyChainlinkClient = await ethers.getContractFactory("MyChainlinkClient");
    const myChainlinkClient = await MyChainlinkClient.deploy(oracle_contract);
    myChainlinkClient_address=await myChainlinkClient.address
    console.log("MyChainlinkClient deployed @ "+ myChainlinkClient_address);

    const uuid="test_uuid";
    const BatteryERC721 = await ethers.getContractFactory("BatteryERC721");
    batteryERC721 = await upgrades.deployProxy(BatteryERC721, ["BatteryToken", "BTK", owner_address, uuid, myChainlinkClient_address], { initializer: 'initialize', kind: 'uups'});
    await batteryERC721.deployed();
    batteryERC721_address=await batteryERC721.address;
    console.log("BatteryERC721 deployed @ "+ batteryERC721_address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Owner address: 0xB01D64120C84C8a574a9588b79A006316AB625b6
// MyChainlinkClient deployed @ 0xd0E9dbA5049be07DFdE350b79F8fb22F2Ee235C7
// BatteryERC721 deployed @ 0xA714406936232d01DFFE0A493BF96d5CB1ED1556