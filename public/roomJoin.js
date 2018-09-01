
console.log("Join room page entered");
//Test for POST function
joinRoom("efqef", "qweqwe");

//On load
//Gets the list of current game rooms

//Displays a list of rooms

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
