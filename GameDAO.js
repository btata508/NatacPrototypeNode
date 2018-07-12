const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

class GameDao{

  //Gets all current rooms in the database that are active
  //Returns promise containing all active game rooms
  getCurrentGameRooms(){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err,db){
        if(err){
          reject(err);
        }
        var database = db.db('Game_dev');
        database.collection('Game_dev').find({'active':true}).toArray(function(err, docs){
          if(err){
            reject(err);
          }
          resolve(docs);
          db.close();
        });
      });
    });
  }

  createGameRoom(gameData){
    return new Promise((resolve, reject) => {
      //Validate entry(Mongoose schema?)

      //
      MongoClient.connect(url, function(err, db){
        if(err){
          reject(err);
        }
        var database = db.db('Game_dev');
        database.collection('Game_dev').insert(gameData, function(err, result){
          if(err){
            reject(err);
          }
          console.log('Created new game room with data ' + JSON.stringify(gameData));
          console.log(`Room ID ${result.ops[0]._id}`);
          resolve(result.ops[0]._id);
          db.close();
        });
      });
    });
  }
}

module.exports = new GameDao();
