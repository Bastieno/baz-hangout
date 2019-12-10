const passport = require('passport')

exports.onlyAuthUsers = passport.authenticate('jwt', { session: false })
