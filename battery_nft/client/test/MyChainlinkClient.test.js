const { expect } = require("chai");
const { ethers } = require("hardhat");

const sepolia_link_token_contract='0x779877A7B0D9E8603169DdbD7836e478b4624789'
const oracle_contract='0xDA1c45672fc425771D3065b6B7cAF59A66051123'

describe("MyChainlinkClient", function () {
    let MyChainlinkClient;
    let myChainlinkClient;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        // Deploy MyChainlinkClient contract
        MyChainlinkClient = await ethers.getContractFactory("MyChainlinkClient");
        myChainlinkClient = await MyChainlinkClient.connect(owner).deploy(sepolia_link_token_contract, oracle_contract);
    });

    it("should allow the owner to change the API url", async function () {
        apiUrl="test_apiUrl_1";
        await myChainlinkClient.connect(owner).setApiUrl(apiUrl);
        expect(await myChainlinkClient.apiUrl()).to.equal(apiUrl);
    });

    it("should allow the owner to change the job ID", async function () {
        jobId="test_jobId_1";
        idx=1;
        await myChainlinkClient.connect(owner).setJobId(idx, jobId);
        expect(await myChainlinkClient.jobId(idx)).to.equal(jobId);
    });

    it("should allow the owner to change the endpoint", async function () {
        endpoint="test_endpoint_1";
        idx=1;
        await myChainlinkClient.connect(owner).setEndpoint(idx, endpoint);
        expect(await myChainlinkClient.endpoint(idx)).to.equal(endpoint);
    });

    it("should allow the owner to change the fees", async function () {
        fee=ethers.utils.parseUnits("0.2", 18);
        await myChainlinkClient.connect(owner).setFee(fee);
        expect(await myChainlinkClient.fee()).to.equal(fee);
    });    

});