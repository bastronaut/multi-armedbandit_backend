var connection = require('./dbconnection');


module.exports = {
  updateView : function updateView(db, color) {
    incrementViewForColor(db, color);
  },
  updateClick : function updateClick(db, color) {

  }
}


function incrementClickForColor(db, color){

}

function incrementViewForColor(db, color){
  console.log(color);
}
