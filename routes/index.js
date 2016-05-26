var express = require('express');
var router = express.Router();

// setup Mongo
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var defaultMongoPort = 27017;
var host = process.env.MD_PORT_27017_TCP_ADDR;
if (host === null) {
    host = 'localhost';
}
var port = process.env.MD_PORT_27017_TCP_PORT;
if (port === null) {
    port = defaultMongoPort;
}
var url = 'mongodb://' + host + ':' + port + '/potentialMatches';


// Run matches
router.post('/notify', function(req, res, next) {
    var user = req.body.email;
    var update = req.body.update;
    // remove deactivated users from all match arrays if update is false
    

    // run matching algorithm if update is true

});

module.exports = router;