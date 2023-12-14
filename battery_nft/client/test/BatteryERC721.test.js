const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BatteryERC721", function () {
    let BatteryERC721;
    let batteryERC721;
    let batteryERC721_addres;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const MockMyChainlinkClient = await ethers.getContractFactory("MockMyChainlinkClient");
        mockMyChainlinkClient = await MockMyChainlinkClient.connect(owner).deploy();

        const uuid="test_uuid";
        const BatteryERC721 = await ethers.getContractFactory("BatteryERC721");
        batteryERC721 = await upgrades.deployProxy(BatteryERC721, ["BatteryToken", "BTK", owner.address, uuid, mockMyChainlinkClient.address], { initializer: 'initialize', kind: 'uups'});
        await batteryERC721.deployed();
        
        // batteryERC721_addres=batteryERC721.address;
    });

    it("should initialize with the correct values", async function () {
        const name = await batteryERC721.name();
        const symbol = await batteryERC721.symbol();
        const contractOwner = await batteryERC721.owner();
        const version = await batteryERC721.version();
        const soc=await batteryERC721.metadata('soc');
    
        expect(name).to.equal("BatteryToken");
        expect(symbol).to.equal("BTK");
        expect(contractOwner).to.equal(owner.address);
        expect(Number(version)).to.equal(1);
        expect(Number(soc)).to.equal(0)
    });

    it("should allow the owner to mint and burn tokens", async function () {
        const tokenId = 1;
    
        await batteryERC721.mint(addr1.address, tokenId);
        const ownerOfToken = await batteryERC721.ownerOf(tokenId);
        expect(ownerOfToken).to.equal(addr1.address);
    
        await batteryERC721.burn(tokenId);
        const balance = await batteryERC721.balanceOf(addr1.address);
        expect(Number(balance)).to.equal(0);
    }); 
    
    it("should not allow non-owners to mint or burn tokens", async function () {
        const tokenId = 1;
    
        await expect(batteryERC721.connect(addr1).mint(addr2.address, tokenId)).to.be.revertedWithCustomError(batteryERC721, 'OwnableUnauthorizedAccount');
        await expect(batteryERC721.connect(addr1).burn(tokenId)).to.be.revertedWithCustomError(batteryERC721, 'OwnableUnauthorizedAccount');
    });

    it("should fetch information from the oracle", async function () {
        await batteryERC721.updateState();
        await expect(Number(await batteryERC721.metadata('soc'))).to.equal(Number(await mockMyChainlinkClient.metadata('soc')))
    });

    // it("should be upgradeable", async function () {

    //     // deploy version 2 and upgrade version 1
    //     const BatteryERC721V2 = await ethers.getContractFactory("BatteryERC721");
    //     batteryERC721V2 = await upgrades.upgradeProxy(batteryERC721V1_addres, BatteryERC721V2, {call: {fn: 'reInitialize', args: ["MyERC721Token", "MTK", owner.address]}, kind: "uups"});
    
    //     const version = await erc721ProxyV1.getVersion();
    //     expect(Number(version)).to.equal(2);
    
    // })


});