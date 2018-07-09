const express = require('express');
var app = express();

//Import routes mapping and pass epress object
require('./routes.js')(app);

//Start server
app.listen(8080);
console.log('Server running on port 8080');
