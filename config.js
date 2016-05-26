module.exports = {

    cutoff: 80,

    mongoURI: {
        test: 'mongodb://localhost/potentialMatches-testing',
        development: 'mongodb://localhost/potentialMatches',
        production: process.env.MONGODB_URI
    }

}