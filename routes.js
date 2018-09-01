var router = require('express').Router();
var natac = require('./NatacController.js');

router.get('/getActiveGameRooms', natac.getActiveGameRooms);
router.post('/room',natac.createGameRoom);

module.exports = router;
