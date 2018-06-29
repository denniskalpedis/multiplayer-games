const mongoose = require('mongoose')

var TTTSchema = new mongoose.Schema({
    gameBoard: [[],[],[]],
    turn: String,
    players: []
   },{timestamps: true});
   
mongoose.model('TTT', TTTSchema);