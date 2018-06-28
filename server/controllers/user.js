const mongoose = require('mongoose'),
      User = mongoose.model('User'),
      bcrypt = require('bcrypt-as-promised');

module.exports = {
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
        User.findOne({email: req.body.email}, function(err,user){
            if(user){
                bcrypt.hash('my password', 10)
                .then(result =>{
                    console.log(result);
                })
                bcrypt.compare(req.body.password, user.password)
                .then( result => {
                    if(result){
                        req.session.userId = user._id;
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
        if(!req.session.userId){
            res.json({loggedIn: false})
            return
        }
        User.findOne({_id: req.session.userId},function(err,user){
            res.json({loggedIn: true, user: user});
        })
    },
    logOut: function(req,res){
        req.session.userId = false;
        console.log(req.session.userId);
        res.json({loggedIn: false});
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