var connection = require('./dbconnection');


module.exports = {
  updateView : function updateView(db, color, callback) {
    incrementViewsForColor(db, color, callback);
  },
  updateClicks : function updateClicks(db, color, callback) {
    incrementClicksForColor(db, color, callback);
  }
}


function incrementClicksForColor(db, color, callback){
  db.collection('conversionStatistics').update(
    {'color' : color},
    { '$inc' : { 'clicks' : 1}
  }, function (err, results) {
    if (err) {
      callback(err);
    } else {
      callback('success')
    }
  });
}

function incrementViewsForColor(db, color, callback){
  db.collection('conversionStatistics').update(
    {'color' : color},
    { '$inc' : { 'views' : 1}
  }, function (err, results){
    if (err) {
      console.log('error incrementing viewcount:', err)
    } else {
      callback();
    }
  }
  );
}
