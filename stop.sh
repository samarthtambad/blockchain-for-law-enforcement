cd $GOPATH/src/blockchain-for-law-enforcement/network

echo "Y" | ./network.sh down
echo "Y" | ./network.sh clean

docker volume rm $(docker volume ls)
