
echo -e "\nThis script restarts the network, removes ../middleware/tmp, and runs the entire demo of workflow\n"
sleep 1

echo -e "\nWill first remove directory ../middleware/tmp and the do an ls of ../network\n"
rm -r tmp
ls

cd $GOPATH/src/blockchain-for-law-enforcement/network
echo -e "\nShifted to " $(pwd) " so that we can bring down and bring up the justicechannel containers"


echo -e "\nNow bringing the network down and back up again\n"
echo "Y" | ./network.sh down
echo -e "\nThere may be 'orphans', so doing another sweep of the containers"
CONTAINER_IDS=$(docker ps -aq)
if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
  echo "---- No orphan containers were found, and proceeding to ./network.sh clean ----"
else
  echo -e "\nFound additional containers " $CONTAINER_IDS
  echo -e "\nRemoving the found containers"
  docker rm -f $CONTAINER_IDS
  echo -e "\nInvoking ./network.sh down for a second time"
  echo "Y" | ./network.sh down
  echo -e "\nCalling docker ps -a to see if we got rid of all the containers finally\n"
  docker ps -a
  echo -e "\nBrought the network down and there should be no active containers now"
fi

VOLUME_IDS=$(docker volume ls -q)
if [ -z "$VOLUME_IDS" -o "$VOLUME_IDS" == " " ]; then
  echo "---- No orphan volumes were found, and proceeding to ./network.sh clean ----"
else
  echo -e "\nFound additional volumes " $VOLUME_IDS
  echo -e "\nRemoving found volumes"
  docker volume rm -f $VOLUME_IDS
  echo -e "\nCalling docker volume ls to see if we got rid of all the containers finally\n"
  docker volume ls
  echo -e "\nBrought the network down and there should be no active containers or volumes now"
fi

echo "Y" | ./network.sh clean
echo "Cleaned/purged the network"
echo "Y" | ./network.sh generate -c justicechannel
echo "Generated config files for the new network"
echo "Y" | ./network.sh up -c justicechannel
echo -e "Launched the 9 containers for the network\n"
echo -e "Sleeping for 15 seconds to let containers come up\n"
sleep 15

echo -e "\nListing the active docker containers\n"
docker ps -a

cd $GOPATH/src/blockchain-for-law-enforcement/middleware
echo -e "\nHave now switched to " $(pwd)

echo -e "\nNow launching createJusticeApp.js "
node createJusticeApp.js

echo -e "\nNow launching runJusticeAppScenario.js "
node runJusticeAppScenario.js

echo -e '\nFinished demo'