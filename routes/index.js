'use strict'

const express = require('express');
const router = express.Router();
const matchAlgorithm = require('../algorithm/algorithm');
const config = require('../config');
let db = require('../db');

// Run matches
router.post('/notify', (req, res, next) => {
    const userEmail = req.body.email;
    const update = req.body.update;
    let allUsers = [];
    // run matching algorithm if update is true
    if (update === true) {
        let currentEmail = "";
        let matchPercent = 0;
        db.potentialMatches.find().toArray()
            .then(docs => {
                allUsers = docs;
                return db.potentialMatches.findOne({
                        email: userEmail
                    })
                    .then(userProfile => {
                        return allUsers.forEach((currentProfile, ind) => {
                                if (currentProfile.email !== userEmail) {
                                    currentEmail = currentProfile.email;
                                    matchPercent = matchAlgorithm(userProfile, currentProfile);
                                    console.log(currentProfile.email, matchPercent);
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
                                                            email: currentEmail
                                                        },
                                                        update: {
                                                            $push: {
                                                                matchSuggestions: {
                                                                    email: userEmail,
                                                                    perc: matchPercent
                                                                }
                                                            }
                                                        },
                                                        new: true
                                                    })
                                                    .then(updatedProfile => {
                                                        return;
                                                    })
                                            });
                                    }
                                }
                            })
                            .then(() => {
                                res.status(200).json({
                                    status: 200,
                                    message: 'Match suggestions updated for ' + userEmail
                                })
                            })
                    })
            })
    } else {
        // remove deactivated users from all match arrays if update is false
        return db.potentialMatches.update({}, {
            $pull: {
                matchSuggestions: {
                    email: userEmail,
                    perc: {
                        $gt: 0
                    }
                }
            }
        }, {
            multi: true
        });
    };
});

module.exports = router;