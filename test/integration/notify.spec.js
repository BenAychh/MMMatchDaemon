const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const pmongo = require('promised-mongo');
// setup Mongo
const defaultMongoPort = 27017;
let host = process.env.MD_PORT_27017_TCP_ADDR;
if (host === null) {
    host = 'localhost';
}
let port = process.env.MD_PORT_27017_TCP_PORT;
if (port === null) {
    port = defaultMongoPort;
}
let url = 'mongodb://' + host + ':' + port + '/potentialMatches';
const db = pmongo(url, ['potentialMatches']);

const server = require('../../../app');

chai.use(chaiHttp);

describe('notify route', () => {

    beforeEach(done => {
        db.dropDatabase();
    })

    afterEach(done => {

    })

    it('should ')

});