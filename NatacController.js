//Controller class for handling requests on the server
var GameDao = require('./GameDAO.js');

class NatacController{
  getActiveGameRooms(req,res){
    console.log('Received request on getActiveGameRooms endpoint');
    GameDao.getActiveGameRooms().then(function(fulfilled){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(fulfilled));
    }).catch(function(error){
      res.status(500);
      res.send(error);
    });
  }

  // testGetInput(req,res){
  //   console.log(`Received request on test get endpoint : ${req.params.input}`);
  //   res.send(`Request received! ${req.params.input}`);
  // }

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

  joinGameRoom(req,res){
    console.log(`Recieved request with ${req.body}`);
    //Get room by id
    GameDao.findRoomById(req.body.id).then(function(result){
      if(result){
        console.log(`Found room ${JSON.stringify(result)}`);
        console.log("Players in the room : " + JSON.stringify(result.players));
        //Add player to list of players
        var players = result.players;
        var joined = false;
        //Iterate through players and break when added
        for(var i = 0; i < players.length; i++){
          if(!players[i].player){
            //TODO flesh out player schema/object
            players[i].player = req.body;
            joined = true;
            break;
          }
        }
        //Update database with new player list
        if(joined){
          GameDao.updatePlayersByRoomId(players, req.body.id).then(function(updated){
            //TODO Respond to client with room data
            if(updated){
              console.log(`Players updated in database. ${players}`);
              res.set('Content-Type', 'application/json');
              res.status(200);
              res.send({'room':'test'});
            }
          }).catch(function(error){
            console.log(`Player ${req.body.playerName} has not joined game room succesfully`);
            res.set('Content-Type', 'application/json');
            res.status(200);
            res.send({'room':'testFail'});
          });
        }
        else{
          //If player could not join the list
          //Probably was a full room
          //TODO validate all scenarios
          console.log(`Player could not be added to room ${req.body.id}.  Room is likely full`);
          res.set('Content-Type', 'application/json');
          res.status(200);
          res.send({'room':'testFail'});
        }
      }
    }).catch(function(error){
      console.log(`Error finding room for id ${req.body.id}.  ${error}`);
      res.sendStatus(500);
    });
  }
}

module.exports = new NatacController();
