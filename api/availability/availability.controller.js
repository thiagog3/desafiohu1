'use strict';

var q = require('q'),
    _ = require('lodash'),
getAvailabilityCollection = require('../../config/database').getAvailabilityCollection;

exports.list = function(req, res) {

  var hotelId = parseInt(req.query.hotelId, 10) | 0;
  var city = req.query.city;
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  getAvailabilityCollection().then(function(collection){
    var hotelSearch = collection.where(function(obj){
      
      if(!obj.isAvailable){
        return false;
      }
      if(startDate && endDate){
        if(obj.timestamp < startDate || obj.timestamp > endDate){
          return false;
        }
      }
      if(hotelId){
        if(obj.hotelId !== hotelId){
          return false;
        }
      }
      if(city){
        if(obj.city !== city){
          return false;
        }
      }
      return true;
    });

    var mapReduced = _.chain(hotelSearch).groupBy("hotelId")
    .map(function(value, key) {
        return [key, _.reduce(value, function(result, currentObject) {
            result.timestamp.push(currentObject.timestamp)
            return {
                city: currentObject.city,
                hotel: currentObject.hotelName,
                timestamp: result.timestamp
            }
        }, {
            timestamp: []
        })];
    })
    .object()
    .value();

    return res.status(200).json(_.values(mapReduced));
  });
};