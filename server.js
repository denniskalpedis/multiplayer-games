var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
require('./server/config/mongoose.js');
var app = express();
app.use(bodyParser.json());
const server = app.listen(8000);
app.use(express.static( __dirname + '/public/dist/public' ));
const mongoose = require('mongoose'),
      User = mongoose.model('User');

var tttEvents = require('./server/ticTacToe/events')

var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.on('disconnect', function() {
    });
    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
    socket.on('tictactoe', function(data){
      switch (data.type) {
        case 'inital':
          return tttEvents.onInit(data, io);
        case 'move':
          return tttEvents.onMove(data, io);
        default:
          break;
      }
    })
  });
app.use(session({
    secret: 'keyboardkitteh',
    store: new FileStore({}),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000000 }
  }));
require('./server/config/routes.js')(app);
