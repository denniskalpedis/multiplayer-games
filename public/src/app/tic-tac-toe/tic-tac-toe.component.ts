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
  game;
  component = this;
  message;
  gamePeice = 'O';
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
      this.socket.emit('tictactoe', {initial: true,gameId: this.gameid});
    });

    this.socket.on('tictactoe',function(data){
      if(data['game']['_id'] == this.gameid){
        this.game = data['game'];
        if(this.game['players'].length<2){
          this.message = "Awaiting a challenger"
          this.gamePeice = 'X';
        }else{
          if(this.game.turn == this.user.username){
            this.message = "Your turn!"
            this.canClick = true;
          }else{
            this.canClick = true;
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
  updateBoard(arr, index){
    console.log('clicked',arr,index);
    if(!this.canClick ){return}
  }

}
