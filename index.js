var loader      = require('./utils/csv-loader'),
    hoteisFile  = __dirname + '/artefatos/hoteis.txt',
    dispFile    = __dirname + '/artefatos/disp.txt',
    loki        = require('lokijs'),
    hoteis     = new loki.Collection('hoteis');
    disp     = new loki.Collection('disp');

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

  data.data.forEach(function (el) {
    hoteis.insert(parseValues(el));
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
    el['date'] = new Date(from[2], from[1] - 1, from[0]);
    el['isAvailable'] = el['isAvailable'].trim() === "1" ? true : false;
    el['id'] = parseInt(el['id'], 10) | 0;
    return el;
  }

  data.data.forEach(function (el) {
    disp.insert(parseValues(el));
  });

});
