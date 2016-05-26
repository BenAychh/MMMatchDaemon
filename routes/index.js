const express = require('express');
const router = express.Router();
const pmongo = require('promised-mongo');
const matchAlgorithm = require('../algorithm/algorithm');
const config = require('../config');

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


// Run matches
router.post('/notify', (req, res, next) => {
    const userEmail = req.body.email;
    const update = req.body.update;
    let allUsers = [];
    // run matching algorithm if update is true
    if (update === true) {
        let currentEmail = "";
        let matchPercent = 0;
        return db.potentialMatches.find({
                $ne: userEmail
            }).toArray()
            .then(docs => {
                allUsers = docs;
                return db.potentialMatches.findOne({
                        email: userEmail
                    })
                    .then(userProfile => {
                        allUsers.forEach(currentProfile => {
                            currentEmail = currentProfile.email;
                            matchPercent = matchAlgorithm(userProfile, currentProfile);
                            if (matchPercent >= config.cutoff) {
                                return db.potentialMatches.findAndModify({
                                        query: {
                                            email: userEmail
                                        },
                                        update: {
                                            $push: {
                                                matchSuggestions: {
                                                    email: currentEmail,
                                                    perc: matchPercent
                                                }
                                            }
                                        },
                                        new: true
                                    })
                                    .then(updatedProf => {
                                        return db.potentialMatches.findAndModify({
                                            query: {
                                                email: currentemail
                                            },
                                            update: {
                                                $push: {
                                                    matchSuggestions: {
                                                        email: userEmail,
                                                        perc: matchPercent
                                                    }
                                                }
                                            }
                                        })
                                    })
                            } else {
                                return;
                            }
                        })
                    })
            })
    } else {
        // remove deactivated users from all match arrays if update is false
        return db.potentialMatches.update({
            $pull: {
                matchSuggestions: {
                    email: userEmail,
                    perc: {
                        $gt: 0
                    }
                }
            }
        })
    }
});

module.exports = router;