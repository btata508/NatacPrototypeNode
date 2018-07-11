var router = require('express').Router();
var natac = require('./NatacController.js');

router.get('/get', natac.testGet);
router.get('/get/:input',natac.testGetInput);
router.post('/room',natac.createGameRoom);

module.exports = router;
