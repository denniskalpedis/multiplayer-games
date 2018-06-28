const mongoose = require('mongoose');
var Chat = mongoose.model('Chat');
var Memory = mongoose.model('Memory');
User = mongoose.model('User'),
bcrypt = require('bcrypt-as-promised');
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
    newUser: function(req,res){
        User.findOne({email: req.body.email},function(err,user){
            if(err){
                res.json({err: true, error: err })
                return
            }
            if(user){
                res.json({err: true, error: "This email is already registered." })
                return
            }else{
                User.findOne({username: req.body.username},function(err,user){
                    if(err){
                        res.json({err: true, error: err })
                        return
                    }
                    if(user){
                        res.json({err: true, error: "This username is already registered." })
                        return
                    }else{
                        bcrypt.hash(req.body.password, 10)
                        .then(hashed_password => {
                        req.body.password = hashed_password;
                        var user = new User({email: req.body.email,username: req.body.username,password: req.body.password, wins: {memory: 0, ticTacToe: 0}});
                            user.save(function(err,user){
                                if(err){
                                    res.json({err: true, error: err });
                                    return
                                }else{
                                    req.session.userId = user._id;
                                    console.log(req.session.userId);
                                    res.json({err: false, user: user});
                                    return
                                }
                            })
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                })
            }
        })

    },
    logIn: function(req,res){
        console.log('in login')
        User.findOne({email: req.body.email}, function(err,user){
            if(user){
                console.log(user)
                bcrypt.hash('my password', 10)
                .then(result =>{
                    console.log(result);
                })
                bcrypt.compare(req.body.password, user.password)
                .then( result => {
                    console.log(result)
                    if(result){
                        res.json({err: false,user:user})
                    }else{
                        res.json({err: true, error: "Invalid email or password." })  
                    }
                }).catch(error => {
                    console.log('in error')
                    console.log(error);
                });

            }else{
                res.json({err: true, error: "Invalid email or password." })
            }
        })
    },
    checkSession: function(req,res){
        console.log(req.session.userId);
        if(!req.session.userId){
            res.json({loggedIn: false});
            return;
        }
        User.findOne({_id: req.session.userId},function(err,user){
            res.json({loggedIn: true, user: user});
        });
    },
    logOut: function(req,res){
        req.session.userId = false;
        console.log(req.session.userId);
        res.json({loggedIn: false});
    },
    getUser: function(req,res){
        User.findOne({_id: req.session.userId}, function(err, user){
            if(err){

            }else{
                res.json({user:user});
            }
        });
    },
    deleteUser: function(req,res){
        User.remove({},function(err){
            if(err){
                console.log(err);
            }
        })
    },
    allUsers: function(req,res){
        User.find({},function(err,users){
            if(err){

            }else{
                res.json({users:users})
            }
        })
    }
}
