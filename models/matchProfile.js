var config = require('../config');


var MatchProfileSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 6,
        lowercase: true,
        unique: true,
        trim: true,
        validate: [
            validations.validEmail,
            '{PATH} must be a valid email. Value: `{VALUE}`'
        ]
    },
    isTeacher: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    training: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 4
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    trainingWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    locTypes: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 3
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    locTypesWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    orgTypes: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 6
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    orgTypesWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    sizes: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 3
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    sizesWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    cals: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 1
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    calsWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    states: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 49
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    statesWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    traits: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 19
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    traitsWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    ageRanges: {
        required: true,
        type: [{
            type: Number,
            min: 0,
            max: 5
        }],
        validate: [
            validations.uniqueVals,
            'Error, {PATH} must be unique values. Value: `{VALUE}`'
        ]
    },
    ageRangesWgt: {
        required: true,
        type: Number,
        min: 1,
        max: 100
    },
    matchSuggestions: {
        type: [{
            email: {
                type: String,
                minlength: 6,
                lowercase: true,
                trim: true,
                validate: [
                    validations.validEmail,
                    '{PATH} must be a valid email. Value: `{VALUE}`'
                ]
            },
            perc: {
                type: Number,
                min: config.cutoff,
                max: 100,
            }
        }]
    }
});