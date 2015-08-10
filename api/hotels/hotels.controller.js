'use strict';

var q = require('q'),
getHotelsCollection = require('../../config/database').getHotelsCollection;

exports.query = function(req, res) {

  var searchParameter = req.query.param;

  getHotelsCollection().then(function(collection){

  	var searchRegex = new RegExp(searchParameter, 'i');
  	
    var search = collection.chain().find({'$or': [{
    		hotel: { '$regex' : searchRegex }
    	}, {
    		local: { '$regex' : searchRegex }
    	}]
	  }).limit(6).data();
    return res.status(200).json(search);
  });
};