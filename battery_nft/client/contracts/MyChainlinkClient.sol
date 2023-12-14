// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract MyChainlinkClient is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    address linkTokenAddressSepolia=0x779877A7B0D9E8603169DdbD7836e478b4624789;

    uint256 public fee;
    string public apiUrl;

    // return parameters 
    mapping(string => uint256) public metadata;

    event RequestMultipleFulfilled(
        bytes32 indexed requestId,
        uint256 soc
    );
    // uint256 soh,
    // uint256 v,
    // uint256 fec,
    // uint256 timestamp


    mapping(uint256 => string) public jobId;
    mapping(uint256 => string) public endpoint;

    constructor(address oracle_) ConfirmedOwner(msg.sender) {
        setChainlinkToken(linkTokenAddressSepolia);
        setChainlinkOracle(oracle_);
        
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)

        // internal variables initialization
        apiUrl="https://qstt7on3adphia4zfukhnytxtm0jicpg.lambda-url.us-east-1.on.aws/";
        endpoint[1]="getState/SOC/";
        jobId[1]="b1d42cd54a3a4200b1f725a68e48aad8";
    }

    function requestState(string memory _uuid) public {
        uint schema=1;
        Chainlink.Request memory req=buildChainlinkRequest(stringToBytes32(jobId[schema]),
                                                           address(this),
                                                           this.fulfillState.selector);
        req.add(
            "get",
            string.concat(apiUrl, endpoint[schema], _uuid)
        );
        req.add(
            "path", "SOC"
        );
        // Multiply the result by 1000000 to remove decimals
        int256 timesAmount = 10 ** 6;
        req.addInt("times", timesAmount);

        sendChainlinkRequest(req, fee); // MWR API.
    }   

    function fulfillState(bytes32 _requestId,
                          uint256 _socResponse
                        //   uint256 sohResponse,
                        //   uint256 vResponse,
                        //   uint256 fecResponse,
                        //   uint256 timestampResponse
                          ) public recordChainlinkFulfillment(_requestId){
        emit RequestMultipleFulfilled(_requestId, 
                                      _socResponse
                                    //   sohResponse,
                                    //   vResponse,
                                    //   fecResponse,
                                    //   timestampResponse
                                     );
        metadata['soc']=_socResponse;
        // soh=sohResponse;
        // v=vResponse;
        // fec=fecResponse;
        // timestamp=timestampResponse;
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function getChainlinkOracle() public view returns (address) {
        return chainlinkOracleAddress();
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

    // ref: https://docs.chain.link/any-api/api-reference/#setchainlinktoken
    function cancelRequest(bytes32 _requestId, 
                           uint256 _payment, 
                           bytes4 _callbackFunctionId, 
                           uint256 _expiration) public onlyOwner {
        cancelChainlinkRequest(_requestId,
                                _payment,
                                _callbackFunctionId,
                                _expiration);
    }

    function setJobId(uint idx, string memory _jobId) public onlyOwner{
        jobId[idx]=_jobId;
    }

    function setFee(uint256 _fee) public onlyOwner{
        fee=_fee;
    }

    function setApiUrl(string memory _apiUrl) public onlyOwner {
        apiUrl=_apiUrl;
    }

    function setEndpoint(uint idx, string memory _endpoint) public onlyOwner {
        endpoint[idx]=_endpoint;
    }

    function setOracle(address _oracle) public onlyOwner{
        setChainlinkOracle(_oracle);
    }
}