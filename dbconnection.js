/*
Singleton implementation for database connection.
TODO: Check potential problems with async when connection to multiple diff dbs.
Currently no problem when a single  DB is used.
*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var initializeRecords = require('./initializeRecords');
var url = 'mongodb://localhost:27017/test';

// container function for singleton
var dbSingleton = function() {};


dbSingleton.getDB = function() {
  if (typeof(dbSingleton.db) === 'undefined') {
    console.log('db singleton undefined, establishing connection...')
    dbSingleton.initDB();
  }
  return dbSingleton.db;
}


dbSingleton.initDB = function() {
  dbSingleton.db = MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('unable to connect', err);
    } else {
      dbSingleton.db = db;
      console.log('connection established ');

      // for reinitialization. does not belong in dbconnection. but: must be
      // called after the DB is initalized or it will fail. refactor later
      // initializeRecords.initialize(dbSingleton.db, function(callback) {})
    }
  });
}


dbSingleton.disconnect = function() {
  if (dbSingleton.db) {
    console.log('db connection is active, closing connection');
    dbSingleton.db.close();
  } else {
    console.log('db connection not active')
  }
}

module.exports = dbSingleton;
