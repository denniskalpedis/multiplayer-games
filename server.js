var express = require("express");
var bodyParser = require('body-parser');
require('./server/config/mongoose.js');
var app = express();
app.use(bodyParser.json());
const server = app.listen(8000);
app.use(express.static( __dirname + '/public/dist/public' ));
require('./server/config/routes.js')(app);