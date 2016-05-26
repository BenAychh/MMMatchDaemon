'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const pmongo = require('promised-mongo');

// seed data
const teachers = require('../algorithm/teachers');
const schools = require('../algorithm/schools');

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

const server = require('../app');

chai.use(chaiHttp);

describe('notify route', () => {

    beforeEach(done => {
        db.dropDatabase();
        db.createCollection('potentialMatches');
        const bulk = db.potentialMatches.initializeOrderedBulkOp();
        teachers.forEach(teacher => {
            return bulk.insert(teacher);
        });
        schools.forEach(school => {
            return bulk.insert(school);
        });
        bulk.execute((err, res) => {
            console.log('seed data bulk executed');
        });
        done();
    });

    afterEach(done => {
        db.dropDatabase();
        done();
    });

    it('should make matches for a user when update is true', done => {
        chai.request(server)
            .post('/notify')
            .send({
                email: 'teacher1@teach.com',
                update: true
            })
            .end((err, res) => {
                res.status.should.equal(200);
                res.should.be.json;
                res.body.message.should.equal('Match suggestions updated for teacher1@teach.com');
                db.potentialMatches.findOne({
                        email: 'teacher1@teach.com'
                    })
                    .then(profile => {
                        profile.matchSuggestions[0].email.should.equal('school1@teach.com');
                    })
                done();
            })
    })

});