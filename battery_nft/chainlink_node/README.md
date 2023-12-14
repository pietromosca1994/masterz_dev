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

4. Compile the Operator contract (use ```README.md``` in ```./operator```)

5. Create a Job Specification

## References
[Chainlink Architecture Request Model](https://docs.chain.link/architecture-overview/architecture-request-model/)  
[Running a Chainlink Node](https://docs.chain.link/chainlink-nodes/v1/running-a-chainlink-node)  
[Job](https://docs.chain.link/chainlink-nodes/oracle-jobs/jobs)

