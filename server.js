var express = require("express");
var bodyParser = require('body-parser');
require('./server/config/mongoose.js');
var app = express();
app.use(bodyParser.json());
const server = app.listen(8000);
// var server = require('http').createServer(app);
// server.listen(8000);
app.use(express.static( __dirname + '/public/dist/public' ));
require('./server/config/routes.js')(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
      console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
  });