var express = require('express');
var app = express();
var connection = require('./dbconnection');
var initializeRecords = require('./initializeRecords');

app.get('/', function (req, res) {
  res.send('hello world')
});

connection.getDB();

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on http://%s:%s', host, port);
})
