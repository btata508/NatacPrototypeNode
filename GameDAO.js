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

  //Create game room with game data
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

  //Return mongo doc by id
  findRoomById(id){
    return new Promise((resolve, reject) =>{
      MongoClient.connect(url, function(err,db){
        if(err || !id){
          reject(err);
          db.close();
        }
        else{
          console.log(`Getting room for id ${id}`);
          var database = db.db(dbName);
          var criteria = {'_id': new mongo.ObjectID(id)};
          database.collection(collectionName).findOne(criteria, function (err, result){
            err ? reject(err) : resolve(result);
            db.close();
          });
        }
      });
    });
  }

  //Updates player list with input list of players
  updatePlayersByRoomId(players, id){
    return new Promise((resolve, reject) => {
      console.log(`Updating players : ${JSON.stringify(players)} room for id ${id}`);
      if(!players || !id){
        reject(false);
      }
      else{
        MongoClient.connect(url, function(err,db){
          if(err){
            reject(err);
            db.close();
          }
          else{
            var criteria = {'_id': new mongo.ObjectID(id)};
            var updateStatement = {$set : {'players': players}};
            var database = db.db(dbName);
            database.collection(collectionName).updateOne(criteria, updateStatement, function (err, result){
              err ? reject(false) : resolve(true);
              db.close();
            });
          }
        });
      }
    });
  }
}

module.exports = new GameDao();
