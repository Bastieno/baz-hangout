const express = require('express');
const AuthCtrl = require('../controllers/auth')
const router = express.Router();

const ThreadsCtrl = require('../controllers/threads');

router.get('', ThreadsCtrl.getThreads);
router.post('', AuthCtrl.onlyAuthUsers, ThreadsCtrl.createThread)

module.exports = router;
