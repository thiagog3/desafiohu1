'use strict';

var express = require('express');
var controller = require('./availability.controller');

var router = express.Router();
router.get('/hotel', controller.list);

module.exports = router;