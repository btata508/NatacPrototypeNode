//Making connection
var socket = io.connect('http://localhost:8080');

var endTurn = document.getElementById('endTurn'),
    rollDice = document.getElementById('rollDice'),
    mainText = document.getElementById('mainText'),
    roomSubmit = document.getElementById('submitRoom'),
    joinRoomButton = document.getElementById('joinRoom'),
    joinRoomTestButton = document.getElementById('joinRoomTest');

// //Emit on load
// socket.emit('clientTest', {
//   message: 'Hi there'
// });
// socket.emit('broadcastTest', {
//   message: 'Sending to other clients'
// });

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
    if(roomInput){
      var roomInputData ={
        active:true,
        players:{ player : 'TestRoom', player:null,player:null,player:null},
        leadingPlayer: 'TestLeading',
        currentPlayer:'TestCurrent',
        name:roomInput,
        board:{}
      }
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response.roomId);
        }
      }
      xmlhttp.open("POST", "http://localhost:8080/room");
      xmlhttp.responseType = 'json';
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify(roomInputData));
    }
});

joinRoomButton.addEventListener('click', function(){
  window.location.href = "./roomFind.html"
});

joinRoomTestButton.addEventListener('click', function(){
      var roomJoinData ={
        playerName: 'TestPlayer',
        id:'5b8a0e54dffabf5a1e308b0f'
      };
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
      }
      xmlhttp.open("POST", "http://localhost:8080/joinRoom");
      xmlhttp.responseType = 'json';
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify(roomJoinData));
});
