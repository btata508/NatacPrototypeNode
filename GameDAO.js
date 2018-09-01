const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
var url = 'mongodb://mongo:27017/';
var dbName = 'Game_dev';
var collectionName = 'Game_dev';

class GameDao{

  //Gets all current rooms in the database that are active
  //Returns promise containing all active game rooms
  getActiveGameRooms(){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err,db){
        if(err){
          db.close();
          reject(err);
        }
        console.log('Connected to DB : ' + db);
        var database = db.db('Game_dev');
        database.collection('Game_dev').find({'active':true}).toArray(function(err, docs){
          if(err){
            db.close();
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
          db.close();
          reject(err);
        }
        var database = db.db(dbName);
        database.collection(collectionName).insert(gameData, function(err, result){
          if(err){
            db.close();
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

  addPlayerToRoom(playerToAdd){
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, function(err, db){
        if(err){
          db.close();
          reject(err);
        }
        if(playerToAdd){
          console.log(playerToAdd.id);
          var object_id = new mongo.ObjectID(playerToAdd.id);
          var criteria = {'_id' : object_id};
          var updateData = {$set : {}};
          var database = db.db(dbName);
          database.collection(collectionName).findOne(criteria, function (err, result){
            if(err){
              db.close();
              reject(err);
            }
            if(result){
              console.log(JSON.stringify(result.players));
            }
            else{
              reject();
            }
          });
        }
        db.close();
      });
    });
  }
}

module.exports = new GameDao();
