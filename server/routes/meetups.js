const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth');

router.get('', MeetupsCtrl.getMeetups);
router.get('/secret', AuthCtrl.onlyAuthUsers, MeetupsCtrl.getSecret)
router.get('/:id', MeetupsCtrl.getMeetupById);

router.post('', AuthCtrl.onlyAuthUsers, MeetupsCtrl.createMeetup);
router.post('/:id/join', AuthCtrl.onlyAuthUsers, MeetupsCtrl.joinMeetup);
router.post('/:id/leave', AuthCtrl.onlyAuthUsers, MeetupsCtrl.leaveMeetup);

router.patch('/:id', AuthCtrl.onlyAuthUsers, MeetupsCtrl.updateMeetup)

module.exports = router;
