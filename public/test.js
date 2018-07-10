//Making connection
var socket = io.connect('http://localhost:8080');

//Emit on load
socket.emit('clientTest', {
  message: 'Hi there'
});
socket.emit('broadcastTest', {
  message: 'Sending to other clients'
});

//Log events being received
socket.on('serverTest', function(data){
  console.log('received data from server ' + data);
});

socket.on('broadcastTest', function(data){
  console.log('received broadcast from server ' + data);
});
