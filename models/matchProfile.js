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
    trainingImportance: {
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
    locTypesImportance: {
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
    orgTypesImportance: {
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
    sizesImportance: {
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
    calsImportance: {
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
    statesImportance: {
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
    traitsImportance: {
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
    ageRangesImportance: {
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