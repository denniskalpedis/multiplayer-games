const User = require('../controllers/user.js');
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
        User.newUser(req,res);
    });
    app.post('/api/user/login', function(req, res) {
        console.log('in route');
        User.logIn(req,res);
    });
    app.get('/api/user/session', function(req,res){
        User.checkSession(req,res);
    });
    app.get('/api/user/logout', function(req,res){
        User.logOut(req,res);
    });
    app.get('/api/user/loggedIn', function(req,res){
        Game.getUser(req,res);
    });
    app.get('/api/user/delete', function(req,res){
        User.deleteUser(req,res);
    });
    app.get('/api/user/all', function(req,res){
        User.allUsers(req,res);
    });
    app.get('/api/TTT/new', function(req,res){
        Game.newTTT(req,res);
    });
    app.post('/api/Memory/new', function(req,res){
        Game.newMemory(req,res);
    });
    app.get('/api/TTT/open', function(req,res){
        Game.openTTT(req,res);
    });
    app.put('/api/Memory/join/:id', function(req,res){
        Game.joinMemoryGame(req,res);
    });
    app.get('/api/Memory/open', function(req,res){
        Game.openMemory(req,res);
    });
    app.get('/api/Memory/game/:id', function(req,res){
        Game.getMemoryGame(req,res);
    });
    app.get('/api/Memory/delete/all', function(req, res){
        Game.deleteAllMemory(req,res);
    });
    app.get('/api/Games/ttt/active/:id', function(req, res){
        console.log("routes");
        Game.activeTTTGames(req,res);
    });
    app.get('/api/Games/memory/active/:id', function(req, res){
        console.log("routes");
        Game.activeMemoryGames(req,res);
    });
    app.put('/api/memory/update/:id', function(req,res){
        Game.updateMemoryGame(req,res);
    });
    app.get('/api/TTT/join/:id', function(req,res){
        Game.joinTTT(req,res);
    });
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
};