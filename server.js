var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
require('./server/config/mongoose.js');
var app = express();
app.use(bodyParser.json());
const server = app.listen(8000);
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 }
  }))
require('./server/config/routes.js')(app);