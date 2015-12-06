/*
File fetches the clicks and views for each color from the database, then
performs the multi-armed bandit algorithm to select a single color to show the
user. Briefly: 90% of the time, the algorithm selects the best performing color
based on click/view ratio. The remaining 10% of the time it will select a
random color.

Sends back:
{ 'selectedColor' : 'color',
  { 'color': 'red', 'views' : x, 'clicks' : y, 'ratio' : z },
  { 'color': 'blue', 'views' : x, 'clicks' : y, 'ratio': z }
  { 'color': 'green', 'views' : x, 'clicks' : y, 'ratio' : z}
}
*/

var connection = require('./dbconnection');



function getStatisticsFromDB (db, callback) {
  var cursor = db.collection('conversionStatistics').find();
  cursor.each(function(err, doc){
    if (doc != null) {
    console.log(doc)}
  })
}


function calculateAVGConversion () {

}


function selectColor () {

}


function returnStatistics () {

}


module.exports = {
  getStatistics : function getStatistics(db, callback) {
    getStatisticsFromDB(db, 'placeholder');
    calculateAVGConversion;
    selectColor;
    returnStatistics;
  }

}
