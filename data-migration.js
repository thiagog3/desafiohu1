var loader      = require('./utils/csv-loader'),
    hoteisFile  = __dirname + '/artefatos/hoteis.txt',
    dispFile    = __dirname + '/artefatos/disp.txt',
    loki        = require('lokijs'),
    getHotelsCollection = require('./config/database').getHotelsCollection,
    getAvailabilityCollection = require('./config/database').getAvailabilityCollection;

var importInitialData = function()
{
  loader.loadCsv(hoteisFile, {
    withHeaders: false,
    intoObjects: true,
    headers: ["id", "local", "hotel"]
  }, function (data) {
    
    data.data.shift();

    function parseValues(el) {
      el['hotel'] = el['hotel'].trim();
      el['id'] = parseInt(el['id'], 10) | 0;
      return el;
    }

    getHotelsCollection().then(function(collection){
      data.data.forEach(function (el) {
        collection.insert(parseValues(el));
      });
      console.log('Initial Hotel data migrated!');
    });
    
  });

  loader.loadCsv(dispFile, {
    withHeaders: false,
    intoObjects: true,
    headers: ["id", "date", "isAvailable"]
  }, function (data) {
    
    data.data.shift();

    function parseValues(el) {
      var from = el['date'].split("/");
      var date = new Date(from[2], from[1] - 1, from[0]);
      el['date'] = date;
      el['isAvailable'] = el['isAvailable'].trim() === "1" ? true : false;
      el['id'] = parseInt(el['id'], 10) | 0;
      el['timestamp'] = date.getTime();

      return el;
    }

    getAvailabilityCollection().then(function(collection){
      data.data.forEach(function (el) {
        collection.insert(parseValues(el));
      });
    });
    console.log('Initial Availability data migrated!');
  });
}

module.exports = {
  importInitialData: importInitialData
}