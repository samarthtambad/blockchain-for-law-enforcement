'use strict';

var Constants = require('./constants.js');
var ClientUtils = require('./clientUtils.js');
var createChannel = require('./create-channel.js');
var joinChannel = require('./join-channel.js');
var installCC = require('./install-chaincode.js');
var instantiateCC = require('./instantiate-chaincode.js');
var invokeCC = require('./invoke-chaincode.js');
var queryCC = require('./query-chaincode.js');


// Create a channel using the given network configuration
createChannel.createChannel(Constants.CHANNEL_NAME).then(() => {
    console.log('\n');
    console.log('--------------------------');
    console.log('CHANNEL CREATION COMPLETE');
    console.log('--------------------------');
    console.log('\n');

    return joinChannel.processJoinChannel();
}, (err) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHANNEL CREATION FAILED:', err);
    console.log('-------------------------');
    console.log('\n');
    process.exit(1);
})
// Join peers to the channel created above
.then(() => {
    console.log('\n');
    console.log('----------------------');
    console.log('CHANNEL JOIN COMPLETE');
    console.log('----------------------');
    console.log('\n');

    return installCC.installChaincode(Constants.CHAINCODE_PATH, Constants.CHAINCODE_VERSION);
}, (err) => {
    console.log('\n');
    console.log('---------------------');
    console.log('CHANNEL JOIN FAILED:', err);
    console.log('---------------------');
    console.log('\n');
    process.exit(1);
})
// Install chaincode on the channel on all peers
.then(() => {
    console.log('\n');
    console.log('---------------------------');
    console.log('CHAINCODE INSTALL COMPLETE');
    console.log('---------------------------');
    console.log('\n');

    return instantiateCC.instantiateOrUpgradeChaincode(
        Constants.FBI_ORG,
        Constants.CHAINCODE_PATH,
        Constants.CHAINCODE_VERSION,
        'init',
        [],
        false
    );
}, (err) => {
    console.log('\n');
    console.log('--------------------------');
    console.log('CHAINCODE INSTALL FAILED:', err);
    console.log('--------------------------');
    console.log('\n');
    process.exit(1);
})
// Instantiate chaincode on the channel on all peers
.then(() => {
    console.log('\n');
    console.log('-------------------------------');
    console.log('CHAINCODE INSTANTIATE COMPLETE');
    console.log('-------------------------------');
    console.log('\n');
    ClientUtils.txEventsCleanup();

    return invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'registerCase', ['case#1', 'Murder at the Orient Express','Murder crime was committed on the Orient Express train'], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INSTANTIATE FAILED:', err);
    console.log('------------------------------');
    console.log('\n');
    process.exit(1);
})
// Invoke a request operation on the chaincode
.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('------------------------------');
    console.log('\n');

    return queryCC.queryChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'getCaseInfo', ['case#1'], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})
// Query the chaincode for the request status
.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('VALUE:', result);
    console.log('-------------------------');
    console.log('\n');
    ClientUtils.txEventsCleanup();
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
});

process.on('uncaughtException', err => {
    console.error(err);
    joinChannel.joinEventsCleanup();
});

process.on('unhandledRejection', err => {
    console.error(err);
    joinChannel.joinEventsCleanup();
});

process.on('exit', () => {
    joinChannel.joinEventsCleanup();
    ClientUtils.txEventsCleanup();
});
