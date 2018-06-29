import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import * as io from "socket.io-client";
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  canClick = false;
  gameid;
  user;
  socket = io.connect();
  game = { gameBoard: null};
  component = this;
  message;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkSession();
    this._route.params.subscribe(params =>{
      console.log(params['id']);
      this.gameid = params['id'];
      this.socket.emit('tictactoe', {type: 'inital',gameId: this.gameid});
    });

    this.socket.on('tictactoe',function(data){
      if(data['game']['_id'] == this.gameid){
        this.game = data['game'];
        if(this.game['players'].length<2){
          this.message = "Awaiting a challenger"
        }else{
          if(this.game.winner != 'none') {
            this.message = `${this.game.winner} has won!`
            this.canClick = false;
          }else if(this.game.turn == this.user.username){
            this.message = "Your turn!"
            this.canClick = true;
          }else{
            this.canClick = false;
            this.message = "Awaiting your opponents move..."
          }
        }
      }
    }.bind(this))

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
  logout(){
    let logout = this._httpService.logout();
    logout.subscribe(data =>{
      if(!data['loggedIn']){
        this._router.navigate(['/login']);
      }
    })
  }
  updateBoard(row, col){
    console.log('clicked',row,col);
    if(!this.canClick || this.game.gameBoard[row][col] != '' ){return}
    this.socket.emit('tictactoe', {type: 'move', gameId: this.gameid, username: this.user.username, row, col})
  }

}
