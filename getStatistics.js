/*
File fetches the clicks and views for each color from the database, then
performs the multi-armed bandit algorithm to select a single color to show the
user. Briefly: 90% of the time, the algorithm selects the best performing color
based on click/view ratio. The remaining 10% of the time it will select a
random color.

Sends back:
{ 'selectedColor' : 'color', 'stats' : [
  { 'color': 'red', 'views' : x, 'clicks' : y, 'ratio' : z },
  { 'color': 'blue', 'views' : x, 'clicks' : y, 'ratio': z }
  { 'color': 'green', 'views' : x, 'clicks' : y, 'ratio' : z} ]
}
*/

var connection = require('./dbconnection');


function getStatisticsFromDB(db, callback) {
  var statisticsQueryPromise = new Promise(
    function(resolve, reject) {
      db.collection('conversionStatistics').find().toArray(function(err, result) {
        if (err) { reject(err, result);
        } else { resolve(result);}
      });
    });

    return statisticsQueryPromise;
}


function calculateAVGConversion(colorStatistics) {
  avgConversionStats = {};
  console.log(colorStatistics);
  colorStatistics.forEach(function(colorStats){
    var tempColorStats = {};
  })
}


function selectColor() {

}


function returnStatistics() {

}


module.exports = {
  getStatistics: function getStatistics(db, callback) {
    var statisticsQueryPromise = getStatisticsFromDB(db, 'placeholder');
    var AVGConversionStatsPromise = statisticsQueryPromise.then(calculateAVGConversion);


    // Start Error handling

    // Gracefully fail: select a random color to send back with stub stats and
    // notify app.js to update corresponding record
    statisticsQueryPromise.catch(
      function(err, colorStatistics) {
        console.log('error fetching data:\n', err, colorStatistics)
      }
    )

    // Gracefully fail: select a random color to send back with stub stats and
    // notify app.js to update corresponding record
    AVGConversionStatsPromise.catch(
      function(err, conversionStats) {
        console.log('error calculating statistics:\n', err, conversionStats)
      }
    )


    calculateAVGConversion;
    selectColor;
    returnStatistics;
  }

}
