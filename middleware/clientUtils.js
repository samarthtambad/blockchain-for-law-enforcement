
var utils = require('fabric-client/lib/utils.js');
var logger = utils.getLogger('ClientUtils');

var path = require('path');
var fs = require('fs-extra');
var util = require('util');

var Client = require('fabric-client');
var copService = require('fabric-ca-client/lib/FabricCAServices.js');
var User = require('fabric-client/lib/User.js');
var Constants = require('./constants.js');

// all temporary files and directories are created under here
var tempdir = Constants.tempdir;

logger.info(util.format(
    '\n\n*******************************************************************************' +
    '\n*******************************************************************************' +
    '\n*                                          ' +
    '\n* Using temp dir: %s' +
    '\n*                                          ' +
    '\n*******************************************************************************' +
    '\n*******************************************************************************\n', tempdir));

// get path to directory storing client-certs (temporary)
module.exports.getTempDir = function() {
    fs.ensureDirSync(tempdir);
    return tempdir;
};

// directory for file based KeyValueStore
module.exports.KVS = path.join(tempdir, 'hfc-test-kvs');
module.exports.storePathForOrg = function(org) {
    return module.exports.KVS + '_' + org;
};

// remove key-value folder store if exists
module.exports.cleanupDir = function(keyValStorePath) {
    var absPath = path.join(process.cwd(), keyValStorePath);
    var exists = module.exports.existsSync(absPath);
    if (exists) {
        fs.removeSync(absPath);
    }
};

// get unique version number
module.exports.getUniqueVersion = function(prefix) {
    if (!prefix) prefix = 'v';
    return prefix + Date.now();
};



