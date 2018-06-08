const express = require('express');
const { home, login, passport } = require('./views.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/').get(home);
router.route('/login').get(login());
router.route('/login/return').get(
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);
module.exports = router;
