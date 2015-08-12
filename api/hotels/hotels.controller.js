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

    var hotelSearch = _(hotelSearch).map(function(search) {
      search.type = 'hotel';
      return search;
    });

    var localSearch = collection.chain().find({'local': { '$regex' : searchRegex } }).limit(6).data();
    var localSearch = _(localSearch).map(function(search) {
      search.type = 'local';
      return search;
    });

    return res.status(200).json(_.union([localSearch,hotelSearch]));
  });
};