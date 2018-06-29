const mongoose = require('mongoose'),
      User = mongoose.model('User'),
      ticTacToe = mongoose.model('TTT');
var Chat = mongoose.model('Chat');
var Memory = mongoose.model('Memory');

module.exports = {
    getAllChats: function(request, response){
        Chat.find({}, function(err, chat){
            if(err){
                response.json({message: "error", error: "DANGER WILL ROBINSON!"});
            } else {
                response.json({message: "GREAT SUCCESS", Chat: chat});
            }
        });
    },
    getChat: function(req, res){
        Chat.find({ room: req.params.room }, function (err, chats) {
            if (err){ 
                return next(err);
            }
            res.json(chats);
            });
    },
    postChat: function(req, res){
        Chat.create(req.body, function (err, post) {
            if (err) {
                return next(err);
            }
            res.json(post);
            });
    },
    newTTT: function(req,res){
        console.log('in new tic tac toe');
        console.log(req.session.userId);
        User.findOne({_id: req.session.userId},function(err,user){
            if(err){
                console.log(err);
            }
            if(user){
                var game = new ticTacToe({gameBoard: [['','',''],['','',''],['','','']],turn: 'none',players: [user], winner: 'none'});
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
    joinTTT: function(req,res){
        User.findOne({_id: req.session.userId},function(err,user){
            if(err){
                console.log(err);
            }
            if(user){
                ticTacToe.findOne({_id: req.params.id},function(err,game){
                    game.players.push(user);
                    game.turn = user.username;
                    game.save(function(err,ttt){
                        if(err){
                            console.log(err)
                        }else{
                            res.json({game: ttt})
                        } 
                    })
                })
            }
        })
    },
    
}
