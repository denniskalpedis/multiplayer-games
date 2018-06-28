const mongoose = require('mongoose'),
      User = mongoose.model('User'),
      ticTacToe = mongoose.model('TTT');

module.exports = {
    newTTT: function(req,res){
        console.log('in new tic tac toe');
        console.log(req.session.userId);
        User.findOne({_id: req.session.userId},function(err,user){
            if(err){
                console.log(err);
            }
            if(user){
                var game = new ticTacToe({gameBoard: [['','',''],['','',''],['','','']],turn: 'none',players: [user]});
                game.save(function(err,ttt){
                    if(err){
                        console.log(err)
                    }else{
                        res.json({game: ttt})
                    }
                })
            }
        })
    },
    openTTT: function(req,res){
        ticTacToe.find({ "users.1": { "$exists": false } }, function(err,games){
            if(err){
                console.log(err)
            }else{
                console.log(games)
                res.json({games: games});
            }
        })
    },
}