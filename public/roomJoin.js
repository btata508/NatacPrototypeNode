
console.log("Join room page entered");
//Test for POST function
//joinRoom("efqef", "qweqwe");

//On load
//Gets the list of current game rooms and displays a list of rooms
var activeRooms = getCurrentGameRooms();
//Allows clicking one room to join it and sends that request to the server

function joinRoom(roomId, userName){
    if(roomId && userName){
      //Send room id and user name to server to join game room
      var roomJoinData = {
        "roomId":roomId,
        "userName":userName
      }
      console.log("Joining game room with data : " + roomJoinData.roomId + " " + roomJoinData.userName);
    }
}

//Gets the active rooms and writes to screen
function getCurrentGameRooms(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    //Write to screen when call returns from server
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.stringify(this.response));
        writeListToScreen(this.response);
    }
  }
  xmlhttp.open("GET", "http://localhost:8080/get");
  xmlhttp.responseType = 'json';
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(null);
}

//Writes each JSON node to screen
function writeListToScreen(activeRooms){
  var list = document.createElement('ul');
  for(var i = 0; i < activeRooms.length; i++){
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(JSON.stringify(activeRooms[i])));
    list.appendChild(item);
  }
  document.getElementById('roomList').appendChild(list);
}
