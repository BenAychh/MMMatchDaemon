'use strict'

const pmongo = require('promised-mongo');

// setup Mongo
const defaultMongoPort = 27017;
let host = process.env.MD_PORT_27017_TCP_ADDR;
if (host === undefined) {
    host = 'localhost';
}
console.log(host);
let port = process.env.MD_PORT_27017_TCP_PORT;
if (port === undefined) {
    port = defaultMongoPort;
}
console.log(port);
let url = 'mongodb://' + host + ':' + port + '/potentialMatches';
let db = pmongo(url, ['potentialMatches']);

module.exports = db;