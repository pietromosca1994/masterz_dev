#!/bin/bash
source chainlink.env

directory=./.chainlink-sepolia

# Check if the directory exists
if [ ! -d "$directory" ]; then
    # If it doesn't exist, create it and its parent directories
    mkdir -p "$directory"
    echo "Directory created: $directory"
else
    echo "Directory already exists: $directory"
fi

# prepare configuration
# https://docs.chain.link/chainlink-nodes/v1/node-config
echo "[Log]
Level = 'warn'

[WebServer]
AllowOrigins = '\*'
SecureCookies = false

[WebServer.TLS]
HTTPSPort = 0

[[EVM]]
ChainID = '11155111'

[[EVM.Nodes]]
Name = 'Sepolia'
WSURL = 'wss://sepolia.infura.io/ws/v3/${INFURA_API_KEY}'
HTTPURL = 'https://sepolia.infura.io/v3/${INFURA_API_KEY}'
" > $directory/config.toml

# prepare secrets
echo "[Password]
Keystore = '${KEYSTORE_PASSWORD}'
[Database]
URL = 'postgresql://postgres:mysecretpassword@host.docker.internal:5432/postgres?sslmode=disable'
" > $directory/secrets.toml

# prepare .api
echo "
${API_USER_EMAIL}
${API_USER_PASSWORD}
" > $directory/.api

