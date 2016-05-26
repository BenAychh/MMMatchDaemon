module.exports = {
    validEmail: validEmail,
    uniqueVals: uniqueVals,
};

function validEmail(val) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
};

function uniqueVals(values) {
    var uniqued = values.reduce(function(acc, val) {
        if (acc.indexOf(val) < 0) {
            acc.push(val);
        }
        return acc;
    }, []);

    return uniqued.length === values.length;
};