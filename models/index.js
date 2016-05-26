var mongoose = require('mongoose');
var config = require('../config');
var environment = process.env.NODE_ENV || 'development';
var mongoURI = config.mongoURI[environment];

mongoose.connect(mongoURI);

module.exports.TeacherMember = require('./matchProfile');