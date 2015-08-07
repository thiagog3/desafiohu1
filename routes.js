'use strict';

var errors = require('./components/errors');

module.exports = function (app) {
    app.use('/api/hotels', require('./api/hotels'));    
    app.route('/:url(api)/*').get(errors[404]);
};