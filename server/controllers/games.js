const mongoose = require('mongoose'),
      User = mongoose.model('User'),
      ticTacToe = mongoose.model('TTT'),
      memory = mongoose.model('Memory');
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
                        console.log(err);
                    }else{
                        res.json({game: ttt});
                    }
                });
            }
        });
    },
    newMemory: function(req,res){
        User.findOne({_id: req.session.userId},function(err,user){
            if(err){
                console.log(err);
            }
            if(user){
                var game = new memory({board: req.body,turn: 1,moves:[],score:[0,0],players: [user]});
                game.save(function(err,memory){
                    if(err){
                        console.log(err);
                    }else{
                        res.json({game: memory});
                    }
                });
            }
        });
    },
    deleteAllMemory: function(request, response){
        memory.remove({}, function(err, game){
            if(err){
                response.json({message: "error", error: "DANGER WILL ROBINSON!"});
            } else {
                response.json({message: "GREAT SUCCESS"});
            }
        });
    },
    deleteAllTTT: function(request, response){
        ticTacToe.remove({}, function(err, game){
            if(err){
                response.json({message: "error", error: "DANGER WILL ROBINSON!"});
            } else {
                response.json({message: "GREAT SUCCESS"});
            }
        });
    },
    getMemoryGame: function(req,res){
        memory.findOne({ _id: req.params.id }, function(err,game){
            if(err){
                console.log(err);
            }else{
                res.json({game: game});
            }
        });
    },
    activeMemoryGames: function(req,res){
        memory.find({ }, function(err,games){
            if(err){
                console.log(err);
            }else{
                res.json({games: games});
            }
        });
    },
    activeTTTGames: function(req,res){
        ticTacToe.find({ }, function(err,games){
            if(err){
                console.log(err);
            }else{
                res.json({games: games});
            }
        });
    },
    updateMemoryGame: function(req,res){
        // memory.findOne({ _id: req.params.id }, function(err,game){
        //     if(err){
        //         console.log("DANGER: will robinson!");
        //         console.log(err);
        //     }else{
        //         game = req.body;
        //         game.save(function(err,memory){
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 res.json({game: memory});
        //             }
        //         });
        //     }
        // });
        memory.updateOne({_id: req.params.id}, Memory(req.body), function(err, game){
            if (err){
                console.log("DANGER: will robinson!");
                console.log(err);
            } else {
                res.json({game: game});
            }
        })
    },
    joinMemoryGame: function(req,res){
        User.findOne({_id: req.session.userId},function(err,user){
            if(err){
                console.log(err);
            }
            memory.findOne({ _id: req.params.id }, function(err,game){
                if(err){
                    console.log(err);
                }else{
                    console.log(game);
                    console.log(user);
                    game.players.push(user);
                    game.save(function(err,memory){
                        if(err){
                            console.log(err);
                        }else{
                            res.json({game: memory});
                        }
                    });
                }
            });
        });
    },
    openMemory: function(req,res){
        memory.find({ "players.1": { "$exists": false } }, function(err,games){
            console.log("finding games");
            console.log(games);
            if(err){
                console.log(err);
            }else{
                console.log(games);
                res.json({games: games});
            }
        });
    },
    openTTT: function(req,res){
        ticTacToe.find({ "players.1": { "$exists": false } }, function(err,games){
            if(err){
                console.log(err);
            }else{
                console.log(games);
                res.json({games: games});
            }
        });
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
                            console.log(err);
                        }else{
                            res.json({game: ttt});
                        } 
                    })
                })
            }
        })
    },
    
}
