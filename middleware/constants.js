var os = require('os');
var path = require('path');

var tempdir = "../network/client-certs";

// define MSP for all four organizations and orderer
var FOUR_ORG_MEMBERS_AND_ADMIN = [{
    role: {
        name: 'member',
        mspId: 'FBIOrgMSP'
    }
}, {
    role: {
        name: 'member',
        mspId: 'NYPDOrgMSP'
    }
}, {
    role: {
        name: 'member',
        mspId: 'NJSPOrgMSP'
    }
}, {
    role: {
        name: 'member',
        mspId: 'JudiciaryOrgMSP'
    }
}, {
    role: {
        name: 'admin',
        mspId: 'CaseOrdererMSP'
    }
}];

// define the endorsement policy
var THREE_OF_FOUR_ORG_MEMBERS = {
    identities: FOUR_ORG_MEMBERS_AND_ADMIN,
    policy: {
        '3-of': [{ 'signed-by': 0 }, { 'signed-by': 1 }, { 'signed-by': 2 }]
    }
};

// no restrictions on endorsement, accept everything
var ACCEPT_ALL = {
    identities: [],
    policy: {
        '0-of': []
    }
};

// define other constants

// paths
var chaincodeLocation = '../chaincode';
var networkId = 'justice-network';
var networkConfig = './config.json';
var networkLocation = '../network';
var channelConfig = 'channel-artifacts/channel.tx'; //

// organizations
var NYPD_ORG = 'nypd';
var FBI_ORG = 'fbi';
var NJSP_ORG = 'njsp';
var JUDICIARY_ORG = 'judiciary';

// channel
var CHANNEL_NAME = 'justicechannel';
var CHAINCODE_PATH = 'github.com/case_workflow_v1';
var CHAINCODE_ID = 'justicecc';
var CHAINCODE_VERSION = 'v0';

// endorsement policy
var TRANSACTION_ENDORSEMENT_POLICY = THREE_OF_FOUR_ORG_MEMBERS;

// export constants from module
module.exports = {
    tempdir: tempdir,   // for client-certs
    chaincodeLocation: chaincodeLocation,
    networkId: networkId,
    networkConfig: networkConfig,
    networkLocation: networkLocation,
    channelConfig: channelConfig,
    NYPD_ORG: NYPD_ORG,
    FBI_ORG: FBI_ORG,
    NJSP_ORG: NJSP_ORG,
    JUDICIARY_ORG: JUDICIARY_ORG,
    CHANNEL_NAME: CHANNEL_NAME,
    CHAINCODE_PATH: CHAINCODE_PATH,
    CHAINCODE_ID: CHAINCODE_ID,
    CHAINCODE_VERSION: CHAINCODE_VERSION,
    ACCEPT_ALL: ACCEPT_ALL,
    TRANSACTION_ENDORSEMENT_POLICY: TRANSACTION_ENDORSEMENT_POLICY
};