'use strict'

const matchState = require('./matchers/matchState');
const matchAge = require('./matchers/matchAge');
const matchTraining = require('./matchers/matchTraining');
const matchCal = require('./matchers/matchCal');
const matchLoc = require('./matchers/matchLoc');
const matchOrg = require('./matchers/matchOrg');
const matchSize = require('./matchers/matchSize');
const matchTraits = require('./matchers/matchTraits');
const calc = require('./calculators');

function match(memberOne, memberTwo) {

    console.log(memberOne);
    console.log(memberTwo);
    // establish all match percentages for individual elements
    // if a non-negotiable element is -1, stop the loop and return a non-match
    let ageMatch = matchAge(memberOne.ageRanges, memberTwo.ageRanges);
    if (ageMatch === (-1)) {
        return 0;
    }

    let stateMatch = matchState(memberTwo.states, memberOne.states);
    if (stateMatch === (-1)) {
        return 0;
    }

    let trainingMatch = matchTraining(memberOne.training, memberTwo.training);
    if (trainingMatch === (-1)) {
        return 0;
    }

    let calMatch = matchCal(memberOne.cals, memberTwo.cals);
    let locMatch = matchLoc(memberOne.locTypes, memberTwo.locTypes);
    let orgMatch = matchOrg(memberOne.orgTypes, memberTwo.orgTypes);
    let sizeMatch = matchSize(memberOne.sizes, memberTwo.sizes);
    let traitMatch = matchTraits(memberOne.traits, memberTwo.traits);

    let matchPercentMemberOne = calc.matchPercentOneWay(ageMatch, memberOne.ageRangesWgt, calMatch, memberOne.calsWgt, locMatch, memberOne.locTypesWgt, orgMatch, memberOne.orgTypesWgt, sizeMatch, memberOne.sizesWgt, stateMatch, memberOne.statesWgt, trainingMatch, memberOne.trainingWgt, traitMatch, memberOne.traitsWgt);
    console.log('matchPercentMemberOne: ', matchPercentMemberOne);
    let matchPercentMemberTwo = calc.matchPercentOneWay(ageMatch, memberTwo.ageRangesWgt, calMatch, memberTwo.calsWgt, locMatch, memberTwo.locTypesWgt, orgMatch, memberTwo.orgTypesWgt, sizeMatch, memberTwo.sizesWgt, stateMatch, memberTwo.statesWgt, trainingMatch, memberTwo.trainingWgt, traitMatch, memberTwo.traitsWgt);
    console.log('matchPercentMemberTwo: ', matchPercentMemberTwo);

    let matchPercent = calc.matchPercentMutual(matchPercentMemberOne, matchPercentMemberTwo).toFixed(2);
    console.log('matchPercent: ', matchPercent);

    return matchPercent;
}

module.exports = match;