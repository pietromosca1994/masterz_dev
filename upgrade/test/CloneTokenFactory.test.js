const { expect, assert } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("CloneTokenFactory", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;

  let erc721ProxyV1
  let erc721ProxyV1_clone;

  let erc721ProxyV1_address;
  let erc721ProxyV1_clone_address;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    console.log('Owner:   ', owner.address);

    // Deploy the ERC721ProxyV1 contract
    const ERC721ProxyV1 = await ethers.getContractFactory("ERC721ProxyV1");
    erc721ProxyV1 = await upgrades.deployProxy(ERC721ProxyV1, ["MyERC721Token", "MTK", owner.address], { initializer: 'initialize', kind: 'uups'});
    await erc721ProxyV1.deployed();
    erc721ProxyV1_address=erc721ProxyV1.address;
    // console.log("erc721ProxyV1 deployed @ " + erc721ProxyV1_address);

    // Deploy the CloneTokenFactory contract
    const implAddress = await upgrades.erc1967.getImplementationAddress(erc721ProxyV1.address);
    CloneTokenFactory = await ethers.getContractFactory("CloneTokenFactory");
    cloneTokenFactory = await CloneTokenFactory.connect(owner).deploy(implAddress);
  });

  it("should create a new ERC721ProxyV1 token", async function () {

    // Deploy ERC721ProxyV1 using the CloneTokenFactory
    const tx = await cloneTokenFactory.createToken("TestToken", "TT", owner.address);
    
    const receipt = await tx.wait()
    const events = await cloneTokenFactory.queryFilter("TokenCreated");
    erc721ProxyV1_clone_address=events[0].args[1];
    erc721ProxyV1_clone = await ethers.getContractAt("ERC721ProxyV1", erc721ProxyV1_clone_address);
    console.log('ERC721ProxyV1_clone deployed @ '+erc721ProxyV1_clone_address)

    // Check if the owner of the created token is correct
    const tokenOwner = await erc721ProxyV1_clone.owner();
    expect(tokenOwner).to.equal(owner.address);

    // Check if the name and symbol are set correctly
    const tokenName = await erc721ProxyV1_clone.name();
    const tokenSymbol = await erc721ProxyV1_clone.symbol();
    const tokenVersion = await erc721ProxyV1_clone.getVersion();
    expect(tokenName).to.equal("TestToken");
    expect(tokenSymbol).to.equal("TT");
    expect(Number(tokenVersion)).to.equal(1);
  });

  it("clone should be upgradeable", async function () {

    // deploy version 2 and upgrade version 1
    const ERC721ProxyV2 = await ethers.getContractFactory("ERC721ProxyV2");
    erc721ProxyV2 = await upgrades.upgradeProxy(erc721ProxyV1.address, ERC721ProxyV2, {call: {fn: 'reInitialize', args: ["MyERC721Token", "MTK", owner.address]}, kind: "uups"});

    const version = await erc721ProxyV1.getVersion();
    expect(Number(version)).to.equal(2);
  })

})
