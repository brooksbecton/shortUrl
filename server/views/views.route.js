const express = require('express');
const { auth, home, list, processLogin, loginReturn } = require('./views.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', home);
router.get('/list', list);
router.get('/auth', auth);
router.get('/auth/facebook', processLogin());
router.get('/auth/facebook/callback', loginReturn());

module.exports = router;
