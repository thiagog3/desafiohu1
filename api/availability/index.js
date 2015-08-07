'use strict';

var express = require('express');
var controller = require('./availability.controller');

var router = express.Router();
router.post('/hotel/:hotelId', controller.list);

module.exports = router;