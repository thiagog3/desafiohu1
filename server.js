var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var dataMigration = require('./data-migration');

dataMigration.importInitialData()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('client'));

var port = process.env.PORT || 9000;
require('./routes')(app)

var server = require('http').createServer(app);
server.listen(port, 'localhost', function () {
  console.log('EXPRESS Server listening on %d', port);
});

exports = module.exports = app;