//Making connection
var socket = io.connect('http://localhost:8080');

var endTurn = document.getElementById('endTurn'),
    rollDice = document.getElementById('rollDice'),
    mainText = document.getElementById('mainText');

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

socket.on('endingTurn', function(data){
  mainText.innerHTML = data;
});

socket.on('rollingDice', function(data){
  mainText.innerHTML = data;
});


endTurn.addEventListener('click',function(){
  socket.emit('endingTurn', {
      player: 'Brian'
  });
});

rollDice.addEventListener('click',function(){
  socket.emit('rollingDice', {
      roll : 6,
      player : 'Brian'
  });
});
