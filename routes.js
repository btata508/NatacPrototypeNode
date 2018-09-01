var router = require('express').Router();
var natac = require('./NatacController.js');

router.get('/getActiveGameRooms', natac.getActiveGameRooms);
router.post('/room',natac.createGameRoom);
router.post('/joinRoom',natac.joinGameRoom);

module.exports = router;
