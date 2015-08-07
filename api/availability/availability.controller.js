'use strict';

var q = require('q'),
getAvailabilityCollection = require('../../config/database').getAvailabilityCollection;

exports.list = function(req, res) {

  var hotelId = parseInt(req.params.hotelId, 10) | 0;
  var initialDate = req.body.initialDate;
  var finalDate = req.body.finalDate;

  getAvailabilityCollection().then(function(collection){
    var search = collection.find({'id': hotelId});

    if(initialDate && finalDate){
      search = collection.where(function(obj){
        return (obj.timestamp >= initialDate && obj.timestamp <=finalDate) && obj.id === hotelId;
      });
    }
    return res.status(200).json(search);
  });
};