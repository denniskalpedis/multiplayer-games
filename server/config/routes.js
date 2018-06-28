const Game = require('../controllers/games.js');
const path = require("path");
// var Chat = require('../models/user.js');

module.exports = function(app){
    // app.get('/api/pets', function(req, res) {
    //     pets.pets(req,res);
    // })
    // app.get('/api/pets/:id', function(req,res){
    //     pets.pet(req,res);
    // })
    // app.post('/api/pets', function(req, res) {
    //     pets.new(req,res);
    // })
    // app.put('/api/pets/update/:id', function(req,res){
    //     pets.update(req,res);
    // })
    // app.get('/api/pets/like/:id', function(req,res){
    //     pets.like(req,res);
    // })
    // app.delete('/api/pets/delete/:id', function(req,res){
    //     pets.remove(req,res);
    // })
    // app.get('/chat', function(req, res, next){
    //     console.log(Date.now());
    //     res.send('REST API!');
    // });
    app.get('/api/chat', function(req, res, next){
            Game.getAllChats(req, res);
        });
    app.get('/chat/:room', function(req, res, next) {
        Game.getChat(req, res);
        // Chat.find({ room: req.params.room }, function (err, chats) {
        // if (err){ 
        //     return next(err);
        // }
        // res.json(chats);
        // });
    });
    app.post('/chat', function(req, res, next) {
        Game.postChat(req, res);
        // Chat.create(req.body, function (err, post) {
        // if (err) {
        //     return next(err);
        // }
        // res.json(post);
        // });
    });
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
};