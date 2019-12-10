const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const AuthCtrl = require('../controllers/auth')

router.get('', UsersCtrl.getUsers);
router.get('/me', AuthCtrl.onlyAuthUsers, UsersCtrl.getCurrentUser);
router.get('/me/activity', AuthCtrl.onlyAuthUsers, UsersCtrl.getUserActivity);

router.patch('/:id', AuthCtrl.onlyAuthUsers, UsersCtrl.updateUser);

router.post('/register', UsersCtrl.register);
router.post('/login', UsersCtrl.login)
router.post('/logout', UsersCtrl.logout)


module.exports = router;
