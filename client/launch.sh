
# Note: launch application server (at: /application) before this.

# setup the network, create/join channel, install/instantiate chaincode, etc
# by calling server APIs

cd $GOPATH/src/blockchain-for-law-enforcement/application/client_scripts
echo -e "\nHave now switched to " $(pwd)

./scripts/adminLogin.sh
./scripts/createChannel.sh
./scripts/joinChannel.sh
./scripts/installChaincode.sh
./scripts/instantiateChaincode.sh
./scripts/userLogin.sh
./scripts/invoke_registerCase.sh

cd $GOPATH/src/blockchain-for-law-enforcement/client
echo -e "\nHave now switched to " $(pwd)

# launch vuejs server for serving the user interface
./node_modules/.bin/vue-cli-service serve