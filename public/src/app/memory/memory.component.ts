import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as io from "socket.io-client";
@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {
  socket = io.connect();
  constructor(private _commonModule: CommonModule,
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  id;
  game;
  user;
  layout = [];
  images = [];
  board = [];
  p1Score = 0;
  p2Score = 0;
  firstPick;
  secondPick;
  winner = false;
  waiting = false;
  player1={color:"red", name: "Player 2"};
  player2={color:"green", name:"Player 1"};
  turn = 1;
  ngOnInit() {
    
    // var user = JSON.parse(localStorage.getItem("user"));
    // user.room = this.id;
    // localStorage.setItem("user", user);
    this._route.params.subscribe(params =>{
      this.id = params['id'];
      this.getGame();
    });
    this.checkSession();
    this.socket.on('updated-game', function (data) {
      this.game = data;
    }.bind(this));
  }
  getGame(){
    let observable = this._httpService.getMemoryGame(this.id);
    observable.subscribe(data =>{
      if(!data['game']){
        // this._router.navigate(['/notFound']);
      }
      this.game = data['game'];
      console.log(this.game);
      this.board = this.game.board;
    });
  }
  checkSession(){
    let loggedIn = this._httpService.checkSession();
    loggedIn.subscribe(data =>{
      if(!data['loggedIn']){
        this._router.navigate(['/login']);
      }
      this.user = data['user'];
    })
  }
  buildBoard(){
    for(var i = 0; i < 54; i++){
      this.images[i] = "/assets/images/dogs/" + i + ".png"
    }
    this.shuffle(this.images);
    for(let i = 0; i < 15; i++){
      this.layout.push(i);
      this.layout.push(i);
    }
    this.shuffle(this.layout);
    for(let i = 0; i <this.layout.length; i++){
      this.board.push({match: this.layout[i], image: this.images[this.layout[i]], active: "none", player:0});
    }
    return this.board;
  }
  onClick(event){
    if(this.board[event.target.id].active == "none" && !this.waiting){
      if(this.firstPick){
        this.game.moves.push(event.target.id);
        this.secondPick = event.target.id;
        this.board[event.target.id].active = this.board[event.target.id].image
        if (this.board[this.firstPick].match == this.board[this.secondPick].match ){
          if (this.game.turn == 1){
            this.game.turn = 2;
            this.game.score[0] ++;
          } else {
            this.game.turn = 1;
            this.game.score[1] ++;
          }
          let update = this._httpService.updateGame(this.game._id, this.game);
          update.subscribe(data =>{
            if(!data['game']){
              console.log("uh-oh, spaggetti-oh's")
            }
            this.socket.emit('update-game', this.game);
          })
          
          this.board[this.firstPick].player = this.turn;
          this.board[this.secondPick].player = this.turn;
          this.firstPick= null;
          this.secondPick= null;
          if (this.game.score[0] + this.game.score[1] == 15){
            this.winner = true;
          }
          return true;
        } else {
          
          this.waiting = true;
          setTimeout(lost=>{ this.board[this.firstPick].active = "none";
          this.board[this.secondPick].active = "none";
          this.firstPick= null;
          this.secondPick= null;
          this.waiting = false;
          if(this.game.turn == 1){
            this.game.turn = 2;
          }else{
            this.game.turn = 1;
          };
          let update = this._httpService.updateGame(this.game._id, this.game);
          update.subscribe(data =>{
            if(!data['game']){
              console.log("uh-oh, spaggetti-oh's")
            }
            this.socket.emit('update-game', this.game);
          })}, 1500);
        }
      } else {
        this.game.moves.push(event.target.id);
                  let update = this._httpService.updateGame(this.game._id, this.game);
          update.subscribe(data =>{
            if(!data['game']){
              console.log("uh-oh, spaggetti-oh's")
            }
            this.socket.emit('update-game', this.game);
          })
        this.board[event.target.id].active = this.board[event.target.id].image
        this.firstPick = event.target.id;
      }
    }
  }
  onClickBoring(event){
    if(this.board[event.target.id].active == "none" && !this.waiting && this.game.players.length == 2 && this.game.players[this.game.turn-1]._id != this.user._id){
      if(this.firstPick){
        this.game.moves.push(event.target.id);
        this.secondPick = event.target.id;
        this.board[event.target.id].active = this.board[event.target.id].image
        if (this.board[this.firstPick].match == this.board[this.secondPick].match ){
          if (this.game.turn == 1){
            this.game.turn = 2;
            this.game.score[0] ++;
          } else {
            this.game.turn = 1;
            this.game.score[1] ++;
          }
          let update = this._httpService.updateGame(this.game._id, this.game);
          update.subscribe(data =>{
            if(!data['game']){
              console.log("uh-oh, spaggetti-oh's")
            }
            this.socket.emit('update-game', this.game);
          })
          this.board[this.firstPick].player = this.turn;
          this.board[this.secondPick].player = this.turn;
          this.firstPick= null;
          this.secondPick= null;
          if (this.game.score[0] + this.game.score[1] == 15){
            this.winner = true;
          }
          return true;
        } else {
          
          this.waiting = true;
          setTimeout(lost=>{ this.board[this.firstPick].active = "none";
          this.board[this.secondPick].active = "none";
          this.firstPick= null;
          this.secondPick= null;
          this.waiting = false;
          if(this.game.turn == 1){
            this.game.turn = 2;
          }else{
            this.game.turn = 1;
          };
          let update = this._httpService.updateGame(this.game._id, this.game);
          update.subscribe(data =>{
            if(!data['game']){
              console.log("uh-oh, spaggetti-oh's")
            }
            this.socket.emit('update-game', this.game);
          })}, 1500);
        }
      } else {
        this.game.moves.push(event.target.id);
          let update = this._httpService.updateGame(this.game._id, this.game);
          update.subscribe(data =>{
            if(!data['game']){
              console.log("uh-oh, spaggetti-oh's")
            }
            this.socket.emit('update-game', this.game);
          })
        this.board[event.target.id].active = this.board[event.target.id].image
        this.firstPick = event.target.id;
      }
    }
  }
  shuffle(arr){
    var currentIndex = arr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

}
