const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameItems", function () {
    let GameItems;
    let gameItems;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        // Deploy PriceConsumerV3 contract
        GameItems = await ethers.getContractFactory("GameItems");
        gameItems = await GameItems.connect(owner).deploy();
    });

    it("should mint initial tokens to the owner", async function () {
      const goldBalance = await gameItems.balanceOf(owner.address, 0);
      const silverBalance = await gameItems.balanceOf(owner.address, 1);
      const hammerBalance = await gameItems.balanceOf(owner.address, 2);
      const swordBalance = await gameItems.balanceOf(owner.address, 3);
      const shieldBalance = await gameItems.balanceOf(owner.address, 4);
  
      expect(goldBalance).to.equal(ethers.utils.parseUnits("1.0", 18));
      expect(silverBalance).to.equal(ethers.utils.parseUnits("1.0", 27));
      expect(hammerBalance).to.equal(1);
      expect(swordBalance).to.equal(ethers.utils.parseUnits("1.0", 9));
      expect(shieldBalance).to.equal(ethers.utils.parseUnits("1.0", 9));
    });
  
    it("should allow the owner to mint and burn tokens", async function () {
      await gameItems.connect(owner).mint(addr1.address, 0, 5, "0x");
      let balance = await gameItems.balanceOf(addr1.address, 0);
      expect(balance).to.equal(5);
  
      await gameItems.burn(addr1.address, 0, 2);
      balance = await gameItems.balanceOf(addr1.address, 0);
      expect(balance).to.equal(3);
    });
  
    it("should allow the owner to mint and burn batches of tokens", async function () {
      const ids = [1, 2, 3];
      const amounts = [5, 2, 3];
  
      await gameItems.mintBatch(addr1.address, ids, amounts, "0x");
      let balance1 = await gameItems.balanceOf(addr1.address, 1);
      let balance2 = await gameItems.balanceOf(addr1.address, 2);
      let balance3 = await gameItems.balanceOf(addr1.address, 3);
  
      expect(balance1).to.equal(5);
      expect(balance2).to.equal(2);
      expect(balance3).to.equal(3);
  
      const burnIds = [1, 3];
      const burnAmounts = [2, 1];
  
      await gameItems.burnBatch(addr1.address, burnIds, burnAmounts);
      balance1 = await gameItems.balanceOf(addr1.address, 1);
      balance2 = await gameItems.balanceOf(addr1.address, 2);
      balance3 = await gameItems.balanceOf(addr1.address, 3);
  
      expect(balance1).to.equal(3);
      expect(balance2).to.equal(2);
      expect(balance3).to.equal(2);
    });
  
    it("should allow the owner to set the URI", async function () {
      const newURI = "https://new-uri.com";
      await gameItems.setURI(newURI);
  
      const tokenURI = await gameItems.uri(0);
      expect(tokenURI).to.equal(newURI);
    });

  });