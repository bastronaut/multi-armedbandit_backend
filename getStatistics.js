/*
File fetches the clicks and views for each color from the database, then
calculates the conversion rate and builds the return object. Mocked data will
be returned in case the steps fail.

Sends back:
{ status' : 'success', 'allColorStats' : [
  { 'color': 'red', 'views' : x, 'clicks' : y, 'avgConversion' : z },
  { 'color': 'blue', 'views' : x, 'clicks' : y, 'avgConversion': z }
  { 'color': 'green', 'views' : x, 'clicks' : y, 'avgConversion' : z} ]
}
*/

var connection = require('./dbconnection');


module.exports = {
  getStatistics: function getStatistics(db, callback) {
    getStatisticsFromDB(db)
    .then(calculateAVGConversion)
    // .then(selectColor)
    // .then(incrementSelectedColorStats)
    // .catch(buildStubbedRecords)
    // .catch(buildStubbedRecords)
    .catch(buildStubbedRecords)
    .catch(buildStubbedRecords)
    .then(callback)
  }
}


function getStatisticsFromDB(db) {
  var statisticsQueryPromise = new Promise(
    function(resolve, reject) {
      db.collection('conversionStatistics').find().toArray(function(err, result) {
        if (err) {
          return Promise.reject(err)
        } else { resolve(result);}
      });
    });
    return statisticsQueryPromise;
}


function calculateAVGConversion(colorStatistics) {
  avgConversionStats = {'allColorStats': [], 'status' : 'success' };
      if (colorStatistics.length < 1) {
        return Promise.reject('empty result set from database')
      }

      colorStatistics.forEach(function(colorsStats) {
        tempColorStats = buildStatisticsObjectForColor(colorsStats);
        avgConversionStats.allColorStats.push(tempColorStats);
      });
  return avgConversionStats;
}


function buildStatisticsObjectForColor(colorStats){
  var avgConversion;
  try {
    avgConversionBeforeRounding = colorStats.clicks / colorStats.views;
    // rounding down to 3 decimals
    avgConversion = Math.round(avgConversionBeforeRounding * 1000) / 1000;

    // isFinite covers both dividing by 0 and NaN cases
    if (!isFinite(avgConversion)) {
      avgConversion = 0
    };
  } catch (err) {
    console.log('error calculating avgConversion', err);
    avgConversion = 0;
  }

  var tempColorStats = {
    'color': colorStats.color,
    'views': colorStats.views,
    'clicks': colorStats.clicks,
    'avgConversion': avgConversion,
  };
  return tempColorStats;
}


// Start Error handling

// Gracefully fail: Send back stub statistics and selectedColor. Let app.js
// handle updating view count
function buildStubbedRecords(error) {
  console.log('building stub records...', error)
  var stubResults =
  {	"status" : "stubbed", "error" : error, "allColorStats": [
    {	"color": "red", "views": 1,	"clicks": 0, "avgConversion": 0	},
    {	"color": "blue","views": 0,	"clicks": 0, "avgConversion": 0 },
    {	"color": "green",	"views": 0,	"clicks": 0, "avgConversion": 0	}],
  }
  return stubResults;
}
