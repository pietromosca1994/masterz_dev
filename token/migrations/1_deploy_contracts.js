const Token = artifacts.require("Token");
const BlackList = artifacts.require("BlackList");

module.exports = async function (deployer, network, accounts) {
  // Deploy BlackList contract
  await deployer.deploy(BlackList);
  const blacklistInstance = await BlackList.deployed();
  console.log("BlackList deployed @ "+blacklistInstance.address)

  // Deploy Token contract and pass the BlackList contract address
  await deployer.deploy(Token, 'MyToken', 'MT', blacklistInstance.address);
  const tokenInstance = await Token.deployed();
  console.log("Token deployed @ "+tokenInstance.address)
};