'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const pmongo = require('promised-mongo');
let db = require('../db');

// seed data
const teachers = require('../algorithm/teachers');
const schools = require('../algorithm/schools');

const server = require('../app');

chai.use(chaiHttp);

describe('notify route', () => {

    beforeEach(function(done) {
        db.dropDatabase();
        db.createCollection('potentialMatches');
        const bulk = db.potentialMatches.initializeOrderedBulkOp();
        teachers.forEach(teacher => {
            db.potentialMatches.save(teacher);
        });
        schools.forEach(school => {
            db.potentialMatches.save(school);
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
                        console.log(profile);
                        profile.matchSuggestions[0].email.should.equal('blah');
                    })
                done();
            })
    });
});