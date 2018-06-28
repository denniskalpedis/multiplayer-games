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
  user;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkSession();
  }
  checkSession(){
    let loggedIn = this._httpService.checkSession();
    loggedIn.subscribe(data =>{
      if(!data['loggedIn']){
        this._router.navigate(['/login']);
      }
      this.user = data['user'];
      console.log(this.user);
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

  }

}
