var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

// setup Mongo
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
var db = mongojs(url, ['potentialMatches']);


// Run matches
router.post('/notify', function(req, res, next) {
    var userEmail = req.body.email;
    var update = req.body.update;
    // remove deactivated users from all match arrays if update is false
    if (update === false) {
        var allUsers = db.potentialMatches.find({
          email: {$ne: userEmail}
        });
        db.potentialMatches.findOne({
            email: userEmail
        }, (err, usersProfile) => {
            
        })
    }


    // run matching algorithm if update is true

});

module.exports = router;