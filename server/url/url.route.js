const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const { create, get, list } = require('./url.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  .get(list)
  .post(create);

router.route('/:hash').get(get);

module.exports = router;
