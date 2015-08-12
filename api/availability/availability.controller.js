'use strict';

var q = require('q'),
getAvailabilityCollection = require('../../config/database').getAvailabilityCollection;

exports.list = function(req, res) {

  var hotelId = parseInt(req.query.id, 10) | 0;

  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  getAvailabilityCollection().then(function(collection){
    var search = collection.find({'id': hotelId});

    if(startDate && endDate){
      search = collection.where(function(obj){
        return (obj.timestamp >= startDate && obj.timestamp <=endDate) && obj.id === hotelId;
      });
    }
    return res.status(200).json(search);
  });
};