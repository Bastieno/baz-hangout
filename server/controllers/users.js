const User = require('../models/users');
const passport = require('passport')

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.register = async function(req, res) {
  const userData = req.body;
  const { email, password, confirmPassword, username } = userData;

  const isUsernameTaken = async (username) => {
    const userArr = await User.find({username})
    console.log('userArr.length', userArr.length)
    console.log('userArr', userArr)

    return userArr.length > 0
  }

  const userExists = await isUsernameTaken(username)
  console.log('userExists', userExists)

  if(userExists) return res.status(409).json({ errors: "Username is already taken" })

  if (!email) return res.status(422).json({
    errors: 'Email is required'
  })

  if (!password) return res.status(422).json({
    errors: 'Password is required'
  })

  if (password !== confirmPassword) return res.status(422).json({
    errors: 'Passwords must be equal'
  })

  const user = new User(userData)

  user.save((errors, savedUserData) => {
    if (errors) return res.status(422).json({
      errors
    })

    return res.status(200).json({
      data: savedUserData
    })
  })
}

exports.login = function(req, res, next) {
  const userData = req.body;
  const { email, password } = userData;

  if (!email) return res.status(422).json({ errors: 'Email is required'})
  if (!password) return res.status(422).json({ errors: 'Password is required'})

  return passport.authenticate('local', (err, passportUser) => {
    if (err) return next(err)

    if (passportUser) {
      req.login(passportUser, (err) => {
        if (err) return next(err)
        return res.status(200).json({passportUser})
      })
    } else {
      return res.status(422).json({ errors: 'Something went wrong!!!'})
    }
  })(req, res, next)
}

exports.logout = function(req, res) {
  req.logout()
  res.status(200).json({ message: 'Session ended'})
}
