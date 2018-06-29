const mongoose = require('mongoose')

var TTTSchema = new mongoose.Schema({
    gameBoard: [[],[],[]],
    turn: String,
<<<<<<< HEAD
    players: []
   },{timestamps: true});
=======
    players: [],
    winner: String,
   },{timestamp: true})
>>>>>>> 537ecc26ece8348880fa2df0cd3316c4f5bd6f5c
   
mongoose.model('TTT', TTTSchema);