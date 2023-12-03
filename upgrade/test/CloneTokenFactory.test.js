const { expect, assert } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("CloneTokenFactory", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the ERC721ProxyV1 contract
    ERC721ProxyV1 = await ethers.getContractFactory("ERC721ProxyV1");
    erc721ProxyV1 = await ERC721ProxyV1.connect(owner).deploy();
    await erc721ProxyV1.deployed();
    // console.log("erc721ProxyV1 deployed @ " + erc721ProxyV1.address);

    // Deploy the ERC721Proxy contract
    ERC721ProxyV2 = await ethers.getContractFactory("ERC721ProxyV2");
    erc721ProxyV2 = await ERC721ProxyV2.connect(owner).deploy();
    await erc721ProxyV2.deployed();
    // console.log("erc721ProxyV2 deployed @ " + erc721ProxyV2.address);

    // Deploy the CloneTokenFactory contract
    CloneTokenFactory = await ethers.getContractFactory("CloneTokenFactory");
    cloneTokenFactory = await CloneTokenFactory.connect(owner).deploy(erc721ProxyV1.address);

    // // Deploy ERC721ProxyV1 using the CloneTokenFactory
    // const tx = await cloneTokenFactory.createToken("TestToken", "TT", owner.address);
    // const receipt = await tx.wait();
    // const createdTokenAddress = receipt.events[0].args.tokenAddress;

    // ERC721ProxyV1 = await ethers.getContractAt("ERC721ProxyV1", createdTokenAddress);

  });

  it("should create a new ERC721ProxyV1 token", async function () {

    // Deploy ERC721ProxyV1 using the CloneTokenFactory
    const tx = await cloneTokenFactory.createToken("TestToken", "TT", owner.address);
    const receipt = await tx.wait();
    const createdTokenAddress = receipt.events[2].args.tokenAddress;

    // console.log(createdTokenAddress);
    ERC721ProxyV1_clone = await ethers.getContractAt("ERC721ProxyV1", createdTokenAddress);
    console.log('ERC721ProxyV1_clone deployed @ '+ERC721ProxyV1_clone.address)

    // Check if the owner of the created token is correct
    const tokenOwner = await ERC721ProxyV1_clone.owner();
    expect(tokenOwner).to.equal(owner.address);

    // Check if the name and symbol are set correctly
    const tokenName = await ERC721ProxyV1_clone.name();
    const tokenSymbol = await ERC721ProxyV1_clone.symbol();
    expect(tokenName).to.equal("TestToken");
    expect(tokenSymbol).to.equal("TT");
  });

  it("should upgrade the ERC721 token to version 2", async function () {
    // Deploy the ERC721ProxyV2 implementation contract
    const ERC721ProxyV2 = await ethers.getContractFactory("ERC721ProxyV2");
    const erc721ProxyV2 = await upgrades.deployProxy(ERC721ProxyV2, ['TokenName', 'TOK', owner.address], { initializer: 'initialize' });
    await erc721ProxyV2.deployed();
    console.log("erc721ProxyV2 deployed @: "+erc721ProxyV2.address);

    ERC721ProxyV1 = await ethers.getContractFactory("ERC721ProxyV1");
    erc721ProxyV1 = await ERC721ProxyV1.connect(owner).deploy();
    await erc721ProxyV1.deployed();
    await erc721ProxyV1.initialize('TokenName', 'TOK', owner.address);

    erc721ProxyV2 = await upgrades.upgradeProxy(erc721ProxyV1.address, ERC721ProxyV2);

    // Retrieve the ERC721ProxyV2 proxy instance
    ERC721ProxyV2 = await ethers.getContractAt("ERC721ProxyV2", ERC721ProxyV1.address);

    // Perform checks to verify the upgrade
    const tokenName = await ERC721ProxyV2.name();
    const tokenSymbol = await ERC721ProxyV2.symbol();
    expect(tokenName).to.equal("UpgradedToken");
    expect(tokenSymbol).to.equal("UT");
  });

})
