//Making connection
var socket = io.connect('http://localhost:8080');

var endTurn = document.getElementById('endTurn'),
    rollDice = document.getElementById('rollDice'),
    mainText = document.getElementById('mainText'),
    roomSubmit = document.getElementById('submitRoom');

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

socket.on('yourTurnEnd', function(data){
  console.log('received data from server ' + data);
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

roomSubmit.addEventListener('click', function(){
    var roomInput = document.getElementById('roomInput').value;
    console.log('Input being checked')
    console.log(roomInput);
    if(roomInput){
      var roomInputData = {
        player:'Brian',
        gameType:'Vanilla',
        numPlayers:{
          low:3,
          high:4
        }
      }
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", "http://localhost:8080/room");
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify(roomInputData));
      console.log('sent request to server')
    }
});

roomSubmit = function(){
  //TODO Hit endpoint on server to create the room, wait for response, then connect on the socket with the room created
  console.log('Room submitted.  ' + roomInput.value);
}
