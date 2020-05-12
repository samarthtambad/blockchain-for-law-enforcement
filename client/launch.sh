
# Note: launch application server (at: /application) before this.

# setup the network, create/join channel, install/instantiate chaincode, etc
# by calling server APIs

echo -e "\nYour are at path: " $(pwd)

./scripts/adminLogin.sh
./scripts/createChannel.sh
./scripts/joinChannel.sh
./scripts/installChaincode.sh
./scripts/instantiateChaincode.sh
./scripts/userLogin.sh
./scripts/invoke_registerCase.sh


# launch vuejs server for serving the user interface
./node_modules/.bin/vue-cli-service serve