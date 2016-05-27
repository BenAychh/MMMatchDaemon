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

    it('should make matches for a user when update is true', function(done) {
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
    });

    it('should ignore any inactive users in the matching process', function(done) {
        db.potentialMatches.findAndModify({
                query: {
                    email: 'school1@teach.com'
                },
                update: {
                    active: false
                }
            })
            .then(() => {
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
                                profile.matchSuggestions.should.eql([]);
                                return;
                            })
                            .then(() => {
                                done();
                            });
                    });
            });

    })

    it('should remove the user from others matchSuggestions array when deactivated', function(done) {
        chai.request(server)
            .post('/notify')
            .send({
                email: 'teacher1@teach.com',
                update: true
            })
            .end((err, res) => {
                chai.request(server)
                    .post('/notify')
                    .send({
                        email: 'school1@teach.com',
                        update: false
                    })
                    .end((err, res) => {
                        res.status.should.equal(200);
                        res.should.be.json;
                        res.body.message.should.equal('school1@teach.com removed from matchSuggestions')
                        return db.potentialMatches.findOne({
                                email: 'teacher1@teach.com'
                            })
                            .then(profile => {
                                profile.matchSuggestions.should.eql([]);
                                return;
                            })
                            .then(() => {
                                done();
                            })
                    })
            });
    });

    it('should return an error if the request body is missing the email parameter', function(done) {
        chai.request(server)
            .post('/notify')
            .send({
                update: true
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.should.be.json;
                res.body.message.should.equal('Please provide an email string and an update boolean');
                done();
            });
    });

    it('should return an error if the request body is missing the update parameter', function(done) {
        chai.request(server)
            .post('/notify')
            .send({
                email: 'teacher1@teach.com'
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.should.be.json;
                res.body.message.should.equal('Please provide an email string and an update boolean');
                done();
            });
    });

    it('should return an error if the email cannot be found', function(done) {
        chai.request(server)
            .post('/notify')
            .send({
                email: 'teacher6@teach.com',
                update: true
            })
            .end((err, res) => {
                res.status.should.equal(400);
                res.should.be.json;
                res.body.message.should.equal('Email does not match any profiles');
                done();
            });
    });

});