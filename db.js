'use strict'

const pmongo = require('promised-mongo');

// setup Mongo
const defaultMongoPort = 27017;
let host = process.env.MD_PORT_27017_TCP_ADDR;
if (host === undefined) {
    host = 'localhost';
}
let port = process.env.MD_PORT_27017_TCP_PORT;
if (port === undefined) {
    port = defaultMongoPort;
}
let url = 'mongodb://' + host + ':' + port + '/potentialMatches';
let db = pmongo(url);
let potentialMatches = db.collection('potentialMatches');

module.exports = db;