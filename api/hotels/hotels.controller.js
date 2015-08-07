'use strict';

var q = require('q'),
getHotelsCollection = require('../../config/database').getHotelsCollection;

exports.search = function(req, res) {

  var searchParameter = req.params.searchParameter;

  getHotelsCollection().then(function(collection){

  	var searchRegex = new RegExp(searchParameter, 'i');
  	
    var search = collection.find({'$or': [{
    		hotel: { '$regex' : searchRegex }
    	}, {
    		local: { '$regex' : searchRegex }
    	}]
	});
    return res.status(200).json(search);
  });
};