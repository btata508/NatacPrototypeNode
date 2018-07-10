const express = require('express');
var app = express();
var socket = require('socket.io');

//Start server
var server = app.listen(8080, function(){
  console.log('listening on 8080');
});

//Serve up public folder
app.use(express.static('public'));

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
});
