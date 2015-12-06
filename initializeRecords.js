/*
Initializing the records in a mongodb. First attempts to remove any existing
records, then inserts a document for each color that we're tracking
*/
var connection = require('./dbconnection');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;


function deleteRecords(db, callback) {
  var deletePromise = new Promise(
    function(resolve, reject) {
      db.collection('conversionStatistics').drop(function(err, result) {
        if (err) {
          console.log('deleting collection failed:', err);
          reject();
        } else {
          console.log('deleted successfully: ', result);
          resolve();
        }
      })
    }
  )
  return deletePromise;
}


function insertInitialStats(db) {
  var colors = ['red', 'blue', 'green'];

  for (var i = 0; i < colors.length; i++) {
    db.collection('conversionStatistics').insertOne({
      "color": colors[i],
      "views": 0,
      "clicks": 0
    }, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log('documents inserted')
      }
    });
  }
}


module.exports = {
  initialize: function initializeRecords(db, callback) {

    deletePromise = deleteRecords(db);

    deletePromise.then(function() {
      insertInitialStats(db);
    });

    deletePromise.catch(function() {
      console.log('deleting failed, aborting')
    });
  }
};
