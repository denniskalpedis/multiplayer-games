const mongoose = require('mongoose');
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
    }
};