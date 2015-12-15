/*
File fetches the clicks and views for each color from the database, then
performs the multi-armed bandit algorithm to select a single color to show the
user. Briefly: 90% of the time, the algorithm selects the best performing color
based on click/view ratio. The remaining 10% of the time it will select a
random color. Mocked data will be returned in case the steps fail.

Sends back:

{'selectedColor' : color, 'status' : 'success'}

*/

var connection = require('./dbconnection');
var getStatistics = require('./getStatistics');


module.exports = {
  getColor: function getColor(db, callback) {
    getStatistics.getStatistics(db, function(res) {
      try{
        var selectedColor = selectColor(res)
      } catch (error) {
        var selectedColor = buildStubbedSelectedColor(error);
      }
      callback(selectedColor);
    })
  }
}


// Multi-armed bandit: 90% select best performer, 10% select random color. If
// all performance is equal (no best performer), select the 1st value.
// Algorithm will balance this out over time
function selectColor(AVGConversionStats) {
  var selectedColor;
  var randomNr = Math.random();

  if (randomNr < 0.9) {
    selectedColor = selectColorWithHighestAvgConversion(AVGConversionStats);
  } else {
    console.log('picking a random color...')
    selectedColor = selectRandomColor(AVGConversionStats);
  }
  console.log('selected color:', selectedColor)
  return {'selectedColor' : selectedColor, 'status' : 'success'};
}


function selectRandomColor(AVGConversionStats){
  var randomIndex = Math.floor((Math.random() * AVGConversionStats.allColorStats.length));
  return AVGConversionStats.allColorStats[randomIndex].color;
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
      console.log('score is higher for,', colorStats.color, ' switching')
      bestPerformingColor = colorStats.color;
      bestPerformingColorAVGConversion = colorStats.avgConversion;
    } else {
      console.log('score is not higher for', colorStats.color)
    }
  })
  return bestPerformingColor;
}


// Implement fail stub color, simply return red
function buildStubbedSelectedColor(error) {
  console.log('error returning selected color:', error)
  return {'selectedColor' : 'red', 'status' : 'stubbed', 'error' : error};
}
