var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connection = require('./dbconnection');
var initializeRecords = require('./initializeRecords');
var getStatistics = require('./getStatistics');
var updateRecords = require('./updateRecords');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
   extended: true
}));


app.get('/', function (req, res) {
  res.send('hello world')
});

connection.getDB();

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on http://%s:%s', host, port);
});


// Call removes all current records from database and resets views/clicks
app.get('/reinitialize/', function (req, res) {
  initializeRecords.initialize(connection.db, function (err, result) {
    if (err) {
      res.send({'status' : err})
    } else {
      res.send({'status' : result})
    }
  });
});



app.get('/updateClickCount/:color', function (req, res) {
  var color = req.params.color;
});



app.get('/getStatistics/', function (req, res) {
  var results = '';

  res.send({'results': results})
});
