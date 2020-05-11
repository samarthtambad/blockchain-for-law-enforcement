# Steps

## First time setup/launching the network

##### 1. switch to network directory
```cd $GOPATH/src/blockchain-for-law-enforcement/network```

##### 2. perform setup (if necessary) and launch the containers.
```./network.sh up```

##### 3. inspect list of running containers in docker.
```docker ps```

##### 4. stop all running containers
```./network.sh down```


## Launching the network in dev mode

### Launching the containers
##### 1. switch to network directory
```cd $GOPATH/src/blockchain-for-law-enforcement/network```

##### 2. stop all running containers
```./network.sh down -d true```

##### 3. remove all left-over docker containers (if any), "-d true" to specify dev mode
```./network.sh clean -d true```

##### 4. launch network in dev mode
```./network.sh up -d true```

Note: Always perform clean after stopping the network


###  Chaincode container
