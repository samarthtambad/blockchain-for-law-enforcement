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
