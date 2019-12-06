const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth');

router.get('', MeetupsCtrl.getMeetups);
router.get('/secret', AuthCtrl.onlyAuthUsers, MeetupsCtrl.getSecret)
router.get('/:id', MeetupsCtrl.getMeetupById);

router.post('', AuthCtrl.onlyAuthUsers, MeetupsCtrl.createMeetup);

module.exports = router;
