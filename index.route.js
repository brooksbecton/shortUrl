const express = require('express');
const userRoutes = require('./server/user/user.route');
const urlRoutes = require('./server/url/url.route');
const countRoutes = require('./server/count/count.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', userRoutes);

// mount url routes at /count
router.use('/count', countRoutes);

// mount url routes at /url
router.use('/url', urlRoutes);

module.exports = router;
