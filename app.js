var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connection = require('./dbconnection');
var initializeRecords = require('./initializeRecords');
var getStatistics = require('./getStatistics');
var updateRecords = require('./updateRecords');
var getColor = require('./getColor');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
   extended: true
}));

app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Content-Type', 'application/json');
   next();
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


app.put('/clickcount/:color', function (req, res) {
  var color = req.params.color;
  updateRecords.updateClicks(connection.db, color, function(result) {
    res.send({'status' : result});
  })
});


app.get('/statistics/', function (req, res) {
  getStatistics.getStatistics(connection.db, function(results){
    console.log('Statistics results: ', results)
    res.send(results);

  });
});


app.get('/color/', function (req, res) {
  getColor.getColor(connection.db, function(results){
    updateRecords.updateView(connection.db, results.selectedColor, function () {
      res.send(results);
    })
  })
})
