var memberOne = require('./memberOne1');
var memberTwo = require('./memberTwo1');
var matchState = require('./matchers/matchState');
var matchAge = require('./matchers/matchAge');
var matchTraining = require('./matchers/matchTraining');
var matchCal = require('./matchers/matchCal');
var matchLoc = require('./matchers/matchLoc');
var matchOrg = require('./matchers/matchOrg');
var matchSize = require('./matchers/matchSize');
var matchTraits = require('./matchers/matchTraits');
var calc = require('./calculators');

function match(memberOne, memberTwo) {
    // establish all match percentages for individual elements
    // if a non-negotiable element is -1, stop the loop and return a non-match
    var ageMatch = matchAge(memberOne.ages, memberTwo.ages);
    if (ageMatch === (-1)) {
        return 0;
    }

    var stateMatch = matchState(memberOne.states, memberTwo.states);
    if (stateMatch === (-1)) {
        return 0;
    }

    var trainingMatch = matchTraining(memberOne.training, memberTwo.training);
    if (trainingMatch === (-1)) {
        return 0;
    }

    var calMatch = matchCal(memberOne.cals, memberTwo.cals);
    var locMatch = matchLoc(memberOne.locTypes, memberTwo.locTypes);
    var orgMatch = matchOrg(memberOne.orgTypes, memberTwo.orgTypes);
    var sizeMatch = matchSize(memberOne.sizes, memberTwo.sizes);
    var traitMatch = matchTraits(memberOne.traits, memberTwo.traits);

    var matchPercentMemberOne = calc.matchPercentOneWay(ageMatch, ageMatchWeight, calMatch, calMatchWeight, locMatch, locMatchWeight, orgMatch, orgMatchWeight, sizeMatch, sizeMatchWeight, stateMatch, stateMatchWeight, trainingMatch, trainingMatchWeight, traitMatch, traitMatchWeight);
    var matchPercentMemberTwo = calc.matchPercentOneWay(ageMatch, ageMatchWeight, calMatch, calMatchWeight, locMatch, locMatchWeight, orgMatch, orgMatchWeight, sizeMatch, sizeMatchWeight, stateMatch, stateMatchWeight, trainingMatch, trainingMatchWeight, traitMatch, traitMatchWeight);

    var matchPercent = calc.matchPercentMutual(matchPercentMemberOne, matchPercentMemberTwo).toFixed(2);

    return matchPercent;
}