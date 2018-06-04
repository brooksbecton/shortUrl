const express = require('express');
const validate = require('express-validation');
const { get } = require('./count.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/').get(get);

module.exports = router;
