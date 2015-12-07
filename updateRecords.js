var connection = require('./dbconnection');


module.exports = {
  updateView : function updateView(db, color) {
    incrementViewsForColor(db, color);
  },
  updateClicks : function updateClicks(db, color) {
    incrementClicksForColor(db, color);
  }
}


function incrementClicksForColor(db, color, callback){
  db.collection('conversionStatistics').update(
    {'color' : color},
    { '$inc' : { 'clicks' : 1}
  }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log('gaat goed')
      callback('success')
    }
  });
}

function incrementViewsForColor(db, color){
  db.collection('conversionStatistics').update(
    {'color' : color},
    { '$inc' : { 'views' : 1}}
  );
}
