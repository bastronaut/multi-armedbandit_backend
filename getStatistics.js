/*
File fetches the clicks and views for each color from the database, then
performs the multi-armed bandit algorithm to select a single color to show the
user. Briefly: 90% of the time, the algorithm selects the best performing color
based on click/view ratio. The remaining 10% of the time it will select a
random color.

Sends back:
{ 'selectedColor' : 'color', 'allColorStats' : [
  { 'color': 'red', 'views' : x, 'clicks' : y, 'ratio' : z },
  { 'color': 'blue', 'views' : x, 'clicks' : y, 'ratio': z }
  { 'color': 'green', 'views' : x, 'clicks' : y, 'ratio' : z} ]
}
*/

var connection = require('./dbconnection');


module.exports = {
  getStatistics: function getStatistics(db, callback) {
    var colorStatistics = getStatisticsFromDB(db)
    .then(calculateAVGConversion)
    .then(selectColor)
    .then(callback);
  }
}


function getStatisticsFromDB(db) {
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
  avgConversionStats = {'allColorStats': [] };
      colorStatistics.forEach(function(colorsStats) {
        tempColorStats = buildStatisticsObjectForColor(colorsStats);
        avgConversionStats.allColorStats.push(tempColorStats);
      });
  return avgConversionStats;
}


function buildStatisticsObjectForColor(colorStats){
  var avgConversion;
  try {
    avgConversion = colorStats.views / colorStats.clicks;
    if (isNaN(avgConversion)) {
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
    'avgConversion': avgConversion
  };
  return tempColorStats;
}


// Multi-armed bandit: 90% select best performer, 10% select random color. If
// all performance is equal (no best performer), selecting the 1st value is no
// problem. Algorithm will balance out
function selectColor(AVGConversionStats) {
  var selectedColor;
  var randomNr = Math.random();

  if (randomNr < 0.9) {
    selectedColor = selectColorWithHighestAvgConversion(AVGConversionStats);
  } else {
    selectedColor = selectRandomColor(AVGConversionStats);
  }

  AVGConversionStats.selectedColor = selectedColor;
  return AVGConversionStats;
}


function selectColorWithHighestAvgConversion(AVGConversionStats){
  var bestPerformingColor;
  var bestPerformingColorAVGConversion;

  AVGConversionStats.allColorStats.forEach(function(colorStats){
    if (bestPerformingColor === undefined) {
      bestPerformingColor = colorStats.color;
      bestPerformingColorAVGConversion = colorStats.avgConversion;
    };
    if (bestPerformingColorAVGConversion < colorStats.avgConversion) {
      bestPerformingColor = colorStats.color;
      bestPerformingColorAVGConversion = colorstats.avgConversion;
    };
  })
  return bestPerformingColor;
}


function selectRandomColor(AVGConversionStats){
  var randomIndex = Math.floor((Math.random() * AVGConversionStats.allColorStats.length));
  return AVGConversionStats.allColorStats[randomIndex].color;
}



// Start Error handling

// Gracefully fail: build
// statisticsQueryPromise.catch(
//   function(err, colorStatistics) {
//     console.log('error fetching data:\n', err, colorStatistics)
//   }
// )

// Gracefully fail: select a random color to send back with stub stats and
// notify app.js to update corresponding record
// AVGConversionStatsPromise.catch(
//   function(err, conversionStats) {
//     console.log('error calculating statistics:\n', err, conversionStats)
//   }
// )
