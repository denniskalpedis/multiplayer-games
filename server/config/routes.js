const User = require('../controllers/user.js');
const Game = require('../controllers/games.js');
const path = require("path");

module.exports = function(app){
    app.post('/api/user/create', function(req, res) {
        User.newUser(req,res);
    })
    app.post('/api/user/login', function(req, res) {
        console.log('in route')
        User.logIn(req,res);
    })
    app.get('/api/user/session', function(req,res){
        User.checkSession(req,res);
    })
    app.get('/api/user/logout', function(req,res){
        User.logOut(req,res);
    })
    app.get('/api/user/delete', function(req,res){
        User.deleteUser(req,res);
    })
    app.get('/api/user/all', function(req,res){
        User.allUsers(req,res);
    })
    app.get('/api/TTT/new', function(req,res){
        Game.newTTT(req,res);
    })
    app.get('/api/TTT/open', function(req,res){
        Game.openTTT(req,res);
    })
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
};