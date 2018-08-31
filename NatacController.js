//Controller class for handling requests on the server
var GameDao = require('./GameDAO.js');

class NatacController{
  testGet(req,res){
    console.log('Received request on test get endpoint');
    GameDao.getCurrentGameRooms().then(function(fulfilled){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(fulfilled));
    }).catch(function(error){
      res.status(500);
      res.send(error);
    });
  }

  testGetInput(req,res){
    console.log(`Received request on test get endpoint : ${req.params.input}`);
    res.send(`Request received! ${req.params.input}`);
  }

  createGameRoom(req,res){
    console.log(`Game room request received ${JSON.stringify(req.body)}`);
    //Need to set header then return some value for room id
    GameDao.createGameRoom(req.body).then(function(roomId){
      console.log(`Room ID from promise ${roomId}`)
      res.set('Content-Type', 'application/json');
      res.status(200);
      res.send({'roomId':roomId});
    }).catch(function(error){
      res.sendStatus(500);
    });
  }

}

module.exports = new NatacController();
