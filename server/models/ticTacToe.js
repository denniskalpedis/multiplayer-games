const mongoose = require('mongoose')

var TTTSchema = new mongoose.Schema({
    gameBoard: [[],[],[]],
    turn: String,
    players: [],
    winner: String,
   },{timestamp: true})
   
mongoose.model('TTT', TTTSchema);