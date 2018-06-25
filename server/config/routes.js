const Game = require('../controllers/games.js');
const path = require("path");

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
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"))
    });
};