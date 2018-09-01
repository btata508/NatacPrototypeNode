const express = require('express');
var socket = require('socket.io');
const bodyParser = require("body-parser");

//Start server
var app = express();
//Serve up public folder
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/',require('./routes.js'));

//Middleware
app.use(function(req,res,next){
    next();
});

var server = app.listen(8080, function(){
  console.log('listening on 8080');
});

//socket setup
var io = socket(server);
//Socket handling
io.on('connection', function (socket){
  console.log('Client has connected to socket ' + socket.id);

  socket.on('clientTest', function(data){
    console.log(JSON.stringify(data) + ' received from client');
    io.sockets.emit('serverTest', 'Some client sent data. emitting to all clients : ' + JSON.stringify(data));
  });

  socket.on('broadcastTest', function(data){
    socket.broadcast.emit('broadcastTest', JSON.stringify(data));
  });

  socket.on('endingTurn', function(data){
    console.log(`Data received from client ${socket.id}.  ${JSON.stringify(data)}`);
    socket.broadcast.emit('endingTurn', data.player + ' has ended their turn!. Next player is : something later');
    socket.emit('yourTurnEnd', 'Your turn has ended!');
  });

  socket.on('rollingDice', function(data){
    console.log(`Data received from client ${socket.id}.  ${JSON.stringify(data)}`);
    //io.sockets.emit('rollingDice', data.player + ' has rolled a ' + data+ '!');
    //Roll dice

    //Emit roll to all clients
  });

});
