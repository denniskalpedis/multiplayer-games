const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {type: String, required: [true, "Email is required"],match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    username: {type: String, required: [true, "Username is required"], minlength: [3, "Username must have at least 3 characters"]},
    password: {type: String,  required: [true, "Password is required."], minlength: [8, "Passwords must have at least 3 characters"]},
    wins: {}
   },{timestamps: true});
var ChatSchema = new mongoose.Schema({
    room: String,
    nickname: String,
    message: String
  },{timestamps: true});
var MemorySchema = new mongoose.Schema({
  room: String,
  board:[],
  turn:Number,
  moves:[],
  score:[],
  players:[]},
  {timestamps: true });
  
   
mongoose.model('User', UserSchema);
mongoose.model('Memory', MemorySchema);
mongoose.model('Chat', ChatSchema);