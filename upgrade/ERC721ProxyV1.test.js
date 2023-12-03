const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("ERC721ProxyV1 contract", function () {
  let owner;
  let addr1;
  let addr2;
  let addrs;

  let erc721ProxyV1;
  let erc721ProxyV2;

  let erc721ProxyV1_address;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const ERC721ProxyV1 = await ethers.getContractFactory("ERC721ProxyV1");
    erc721ProxyV1 = await upgrades.deployProxy(ERC721ProxyV1, ["MyERC721Token", "MTK", owner.address], { initializer: 'initialize', kind: 'uups'});
    await erc721ProxyV1.deployed();

    erc721ProxyV1_address=erc721ProxyV1.address;
    // console.log("erc721ProxyV1 deployed @ "+erc721ProxyV1.address)


    // erc721Proxy.initialize("MyERC721Token", "MTK", owner.address);
  });

  it("should initialize with the correct values", async function () {
    const name = await erc721ProxyV1.name();
    const symbol = await erc721ProxyV1.symbol();
    const contractOwner = await erc721ProxyV1.owner();
    const version = await erc721ProxyV1.getVersion();

    expect(name).to.equal("MyERC721Token");
    expect(symbol).to.equal("MTK");
    expect(contractOwner).to.equal(owner.address);
    expect(Number(version)).to.equal(1);
  });

  it("should allow the owner to mint and burn tokens", async function () {
    const tokenId = 1;

    await erc721ProxyV1.mint(addr1.address, tokenId);
    const ownerOfToken = await erc721ProxyV1.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(addr1.address);

    await erc721ProxyV1.burn(tokenId);
    const balance = await erc721ProxyV1.balanceOf(addr1.address);
    expect(Number(balance)).to.equal(0);
  });

  it("should be upgradeable", async function () {

    // deploy version 2 and upgrade version 1
    const ERC721ProxyV2 = await ethers.getContractFactory("ERC721ProxyV2");
    erc721ProxyV2 = await upgrades.upgradeProxy(erc721ProxyV1_address, ERC721ProxyV2, {call: {fn: 'reInitialize', args: ["MyERC721Token", "MTK", owner.address]}, kind: "uups"});

    const version = await erc721ProxyV1.getVersion();
    expect(Number(version)).to.equal(2);

  })

  // it("should not allow non-owners to mint or burn tokens", async function () {
  //   const tokenId = 1;

  //   await expect(erc721ProxyV1.connect(addr1).mint(addr2.address, tokenId)).to.be.revertedWithCustomError(erc721ProxyV1, 'OwnableUnauthorizedAccount');
  //   await expect(erc721ProxyV1.connect(addr1).burn(tokenId)).to.be.revertedWithCustomError(erc721ProxyV1, 'OwnableUnauthorizedAccount');
  // });


});