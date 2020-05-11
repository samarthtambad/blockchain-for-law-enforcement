'use strict';

var Constants = require('./constants.js');
var ClientUtils = require('./clientUtils.js');
var createChannel = require('./create-channel.js');
var joinChannel = require('./join-channel.js');
var installCC = require('./install-chaincode.js');
var instantiateCC = require('./instantiate-chaincode.js');
var invokeCC = require('./invoke-chaincode.js');
var queryCC = require('./query-chaincode.js');


/////////////////////////////////
// INVOKE AND QUERY OPERATIONS //
/////////////////////////////////

// INVOKE: registerCase
invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'registerCase', ["case#1", "Murder at the Orient Express", "Murder crime was committed on the Orient Express train"], 'FBI_User')
.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('registerCase SUCCEEDED');
    console.log('------------------------------');
    console.log('\n');

    // QUERY: getCaseInfo
    return queryCC.queryChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'getCaseInfo', ["case#1"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('registerCase FAILED');
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})


.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getCaseInfo VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // INVOKE: addSuspectToCase
    return invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'addSuspectToCase', ["case#1", "suspect#1", "James Bond"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getCaseInfo FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('addSuspectToCase SUCCEEDED');
    console.log('------------------------------');
    console.log('\n');

    // QUERY: getCaseInfo
    return queryCC.queryChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'getCaseInfo', ["case#1"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('addSuspectToCase FAILED');
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getCaseInfo VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // INVOKE: addSuspectToCase
    return invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'addSuspectToCase', ["case#1", "suspect#2", "Ruskin Bond"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getCaseInfo FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('addSuspectToCase SUCCEEDED');
    console.log('------------------------------');
    console.log('\n');

    // QUERY: getCaseInfo
    return queryCC.queryChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'getCaseInfo', ["case#1"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('addSuspectToCase FAILED');
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getCaseInfo VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // INVOKE: addEvidenceForCase
    return invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'addEvidenceForCase', ["case#1", "1", "blood stains were found on the staircase"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getCaseInfo FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('addEvidenceForCase SUCCEEDED');
    console.log('------------------------------');
    console.log('\n');

    // QUERY: getCaseInfo
    return queryCC.queryChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'getCaseInfo', ["case#1"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('addEvidenceForCase FAILED');
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getCaseInfo VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // INVOKE: addEvidenceForSuspect
    return invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'addEvidenceForSuspect', ["case#1", "suspect#1", "1", "DNA of blood sample matches suspect"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getCaseInfo FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('addEvidenceForSuspect SUCCEEDED');
    console.log('------------------------------');
    console.log('\n');

    // QUERY: getCaseInfo
    return queryCC.queryChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'getCaseInfo', ["case#1"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('addEvidenceForSuspect FAILED');
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getCaseInfo VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // QUERY: getActiveSuspects
    return queryCC.queryChaincode(Constants.JUDICIARY_ORG, Constants.CHAINCODE_VERSION, 'getActiveSuspects', ["case#1"], 'Supreme_Court_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getCaseInfo FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getActiveSuspects VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // QUERY: getSuspectInfo
    return queryCC.queryChaincode(Constants.JUDICIARY_ORG, Constants.CHAINCODE_VERSION, 'getSuspectInfo', ["case#1", "suspect#1"], 'Supreme_Court_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getActiveSuspects FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getSuspectInfo VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // INVOKE: eliminateSuspect
    return invokeCC.invokeChaincode(Constants.FBI_ORG, Constants.CHAINCODE_VERSION, 'eliminateSuspect', ["case#1", "suspect#1"], 'FBI_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getSuspectInfo FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then(() => {
    console.log('\n');
    console.log('------------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('eliminateSuspect SUCCEEDED');
    console.log('------------------------------');
    console.log('\n');

    // QUERY: getActiveSuspects
    return queryCC.queryChaincode(Constants.JUDICIARY_ORG, Constants.CHAINCODE_VERSION, 'getActiveSuspects', ["case#1"], 'Supreme_Court_User');
}, (err) => {
    console.log('\n');
    console.log('-----------------------------');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('eliminateSuspect FAILED');
    console.log('-----------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE QUERY COMPLETE');
    console.log('getActiveSuspects VALUE:', result);
    console.log('-------------------------');
    console.log('\n');

    // INVOKE: registerCase
    return invokeCC.invokeChaincode(Constants.JUDICIARY_ORG, Constants.CHAINCODE_VERSION, 'registerCase', ["case#2", "Burglary at Bank", "A burglar entered the bank at 11 am and ..."], 'Supreme_Court_User');
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('CHAINCODE QUERY FAILED:', err);
    console.log('getActiveSuspects FAILED');
    console.log('------------------------');
    console.log('\n');
    process.exit(1);
})



.then((result) => {
    console.log('\n');
    console.log('-------------------------');
    console.log('CHAINCODE INVOCATION COMPLETE');
    console.log('registerCase SUCCEEDED');
    console.log('-------------------------');
    console.log('\n');

    ClientUtils.txEventsCleanup();
}, (err) => {
    console.log('\n');
    console.log('------------------------');
    console.log('-----ACCESS CONTROL-----');
    console.log('CHAINCODE INVOCATION FAILED:', err);
    console.log('registerCase FAILED');
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
});
