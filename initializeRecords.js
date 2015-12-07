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
          resolve();
        } else {
          console.log('deleted successfully: ', result);
          resolve();
        }
      })
    }
  )
  return deletePromise;
}

// Maybe async problem with for loop and callback being called before
// documents have been fully inserted. Seems to work so far. If problem,
// add promise
function insertInitialStats(db, callback) {
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
  callback(null, 'success')
}


module.exports = {
  initialize: function initializeRecords(db, callback) {

    var deleteRecordsPromise = deleteRecords(db);

    deleteRecordsPromise.then(function() {
      insertInitialStats(db, callback);
    });

    deleteRecordsPromise.catch(function() {
      console.log('deleting failed, collection probably doesnt exist, insert anyway')
      insertInitialStats(db, callback);
      callback('error deleting records', null)
    });
  }

};
