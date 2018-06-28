const Game = require('../controllers/games.js');
const path = require("path");

module.exports = function(app){
    app.get('/api/chat', function(req, res, next){
            Game.getAllChats(req, res);
        });
    app.get('/chat/:room', function(req, res, next) {
        Game.getChat(req, res);
    });
    app.post('/chat', function(req, res, next) {
        Game.postChat(req, res);
    });
    app.post('/api/user/create', function(req, res) {
        Game.newUser(req,res);
    });
    app.post('/api/user/login', function(req, res) {
        Game.logIn(req,res);
    });
    app.get('/api/user/session', function(req,res){
        Game.checkSession(req,res);
    });
    app.get('/api/user/logout', function(req,res){
        Game.logOut(req,res);
    });
    app.get('/api/user/delete', function(req,res){
        Game.deleteUser(req,res);
    });
    app.get('/api/user/loggedIn', function(req,res){
        Game.getUser(req,res);
    });
    app.get('/api/user/all', function(req,res){
        Game.allUsers(req,res);
    });
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
};