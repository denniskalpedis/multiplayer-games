var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
require('./server/config/mongoose.js');
var app = express();
app.use(bodyParser.json());
const server = app.listen(8000);
app.use(express.static( __dirname + '/public/dist/public' ));

var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
      console.log('User disconnected');
    });
    socket.on('update-game', function(game){
      console.log("updating Game!");
      io.emit('updated-game', { game: game });
    });
    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
  });
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 }
  }));
require('./server/config/routes.js')(app);
