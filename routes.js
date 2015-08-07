'use strict';

var errors = require('./components/errors');

module.exports = function (app) {
    app.use('/api/hotels', require('./api/hotels'));   
    app.use('/api/availability', require('./api/availability'));    
    app.route('/:url(api)/*').get(errors[404]);
};