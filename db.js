'use strict'

const pmongo = require('promised-mongo');

// setup Mongo
const mongoUri = process.env.MONGODB_URI
let db = pmongo(mongoUri, ['potentialMatches']);

module.exports = db;
