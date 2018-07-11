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
    console.log(`Game room request received ${req.body}`);
    res.send('ending');
  }

}

module.exports = new NatacController();
