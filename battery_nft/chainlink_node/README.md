# ChainlinkNode

# Setup a Chainlink Node
1. Prepare the environment files in ```./docker```
```bash 
#chainlink.env
API_USER_EMAIL=
API_USER_PASSWORD=
WALLET_PASSWORD=
INFURA_API_KEY=
KEYSTORE_PASSWORd=
```
```bash 
#chainlink.env
POSTGRES_PASSWORD=
POSTGRES_DB=
```

2. Create artifacts
```bash 
cd ./docker
chmod +x setup_node.sh 
./setup_node.sh 
```

3. Run the docker-compose network
```bash
docker-compose up
```

4. Compile and deploy the Operator contract (use ```README.md``` in ```./operator```)

5. Compile and deploy the client contract

6. Whitelist the Chainlink Node Address in the Operator contract with setAuthorizedSenders

7. Create a Job Specification using the node dashboard ([Chainlink Node Dashboard](http://localhost:6688/signin))

8. Fund the Chainlink Node Address with ETH

## References
[Chainlink Architecture Request Model](https://docs.chain.link/architecture-overview/architecture-request-model/)  
[Running a Chainlink Node](https://docs.chain.link/chainlink-nodes/v1/running-a-chainlink-node)  
[Job](https://docs.chain.link/chainlink-nodes/oracle-jobs/jobs)

