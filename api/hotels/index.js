'use strict';

var express = require('express');
var controller = require('./hotels.controller');

var router = express.Router();
router.get('/search/:searchParameter', controller.search);

module.exports = router;