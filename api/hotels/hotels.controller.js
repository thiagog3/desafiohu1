'use strict';

var q = require('q'),
    _ = require('lodash'),
getHotelsCollection = require('../../config/database').getHotelsCollection;

exports.query = function(req, res) {

  var searchParameter = req.query.param;
  
  getHotelsCollection().then(function(collection){
  	var searchRegex = new RegExp(searchParameter, 'i');
    
    var hotelSearch = collection.chain().find({'$or': [{
    		hotel: { '$regex' : searchRegex }
    	}, {
    		local: { '$regex' : searchRegex }
    	}]
	  }).limit(6).data();

    var hotelSearch = _.chain(hotelSearch).map(function(search) {
      search.type = 'hotel';
      var hotel = {
        hotel: {
          name: search.hotel,
          id: search.id
        },
        city: search.local,
        type: 'hotel'
      }
      return hotel;
    }).value();

    var localSearch = collection.chain().find({
      'local': { '$regex' : searchRegex }
    }).limit(6).data();

    var localSearch = _.chain(localSearch).map(function(search) {
      var city = {
        city: search.local,
        type: 'city'
      }
      return city;
    }).uniq(false, 'city').value();
    
    return res.status(200).json(localSearch.concat(hotelSearch));
  });
};