//Mapping for all endpoints to the corresponding functions
module.exports = function(app){
  var natac = require('./NatacController.js');
  app.get('/get', natac.testGet);
  app.get('/get/:input',natac.testGetInput);
}
