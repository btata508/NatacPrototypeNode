//Controller class for handling requests on the server
class NatacController{
  testGet(req,res){
    console.log('Received request on test get endpoint');
    res.send('Test Function');
  }

  testGetInput(req,res){
    console.log(`Received request on test get endpoint : ${req.params.input}`);
    res.send(`Request received! ${req.params.input}`);
  }

  createGameRoom(req,res){
    console.log(`Game room request received ${JSON.stringify(req.body)}`);
    //Need to set header then return some value for room id
    res.sendStatus(200);
  }

}

module.exports = new NatacController();
