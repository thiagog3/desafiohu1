'use strict';

var express = require('express');
var controller = require('./hotels.controller');

var router = express.Router();
router.get('/query', controller.query);

module.exports = router;