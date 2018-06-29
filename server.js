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
      User = mongoose.model('User'),
      ticTacToe = mongoose.model('TTT');

var io = require('socket.io')(server);
io.on('connection', function (socket) {
    socket.on('disconnect', function() {
    });
    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
    socket.on('tictactoe', function(data){
      if(data['initial']){
        console.log(data);
        ticTacToe.findOne({ _id: data['gameId'] }, function(err,game){
          if(err){
              console.log(err)
          }else{
            console.log('about to emit');
              io.emit('tictactoe', {game: game} );
          }
      })
      }else{
        ticTacToe.findOne({ _id: data['game']['_id'] }, function(err,game){
          if(err){
              console.log(err)
          }else{
            for(person of game.players){
              if(person.username != game.turn){
                game.turn = person.username;
              }
            }
            game.gameBoard = data['game']['gameBoard'];
            game.save(function(err,ttt){
              if(err){
                  console.log(err)
              }else{
                io.emit('tictactoe', {game: ttt} );
              }
          })
          }
      })
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
