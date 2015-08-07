'use strict';

var fs = require('fs')
var loki = require('lokijs');
var q = require('q');

var db = null;
var dbFile = 'db.json';

var getDataBase = function(){

  var defered = q.defer();

  if(db){
    defered.resolve(db);
    return defered.promise;
  }

  db = new loki(dbFile);
  defered.resolve(db);
  return defered.promise;
};

var getCollection = function(collectionName, indices){
  var defered = q.defer();

    getDataBase().then(function(database){
      var coll = database.getCollection(collectionName);
      if (coll === null) {
        var options = {};
        if(indices){
          options.indices = indices;
        }
        coll = database.addCollection(collectionName, options);
      }
      defered.resolve(coll);
    });
    return defered.promise; 
};

module.exports = {
  getHotelsCollection: function(){
    return getCollection("hotels");
  },
  getAvailabilityCollection: function(){
    return getCollection("availability", ['id', 'date']);
  },
};