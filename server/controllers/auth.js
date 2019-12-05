const passport = require('passport')
// exports.onlyAuthUsers = function(req, res, next) {
//   if(req.isAuthenticated()) return next()

//   return res.status(401).json({ message: 'Authenticated users only'})
// }

exports.onlyAuthUsers = passport.authenticate('jwt', { session: false })
