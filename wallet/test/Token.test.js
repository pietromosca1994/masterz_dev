// test/token.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  let Token;
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the Token contract
    Token = await ethers.getContractFactory("Token");
    token = await Token.connect(owner).deploy("MyToken", "MTK", 1000000);
  });

  it("Should return the correct name, symbol, and initial supply", async function () {
    expect(await token.name()).to.equal("MyToken");
    expect(await token.symbol()).to.equal("MTK");
    expect(await token.totalSupply()).to.equal(1000000);
  });

  it("Should allow the owner to mint new tokens", async function () {
    await token.connect(owner).mint(addr2.address, 500);
    expect(await token.balanceOf(addr2.address)).to.equal(500);
  });

  it("Should allow burning tokens by the token owner", async function () {
    await token.connect(owner).burn(500);
    expect(await token.balanceOf(owner.address)).to.equal(999500);
  });

  it("Should transfer token", async function () {
    await token.connect(owner).transfer(addr1, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should not allow burning tokens by non-owner", async function () {
    await expect(token.connect(addr1).burn(500)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});