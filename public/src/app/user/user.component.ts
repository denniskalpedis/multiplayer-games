import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MemoryComponent } from '../memory/memory.component';
import * as io from "socket.io-client";
@Component({
  providers:[MemoryComponent],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  socket = io.connect();
  user;
  TTTGames;
  Mgames;
  allMemoryGames;
  allTTTGames;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _memory: MemoryComponent
  ) { }

  ngOnInit() {
    this.checkSession();
    this.getOpenTTT();
    this.getOpenMemory();
    this.socket.on('new-memory-games', function (data) {
      this.Mgames = data["game"];
      
    }.bind(this));
    // this.getActiveGames();
  }
  checkSession(){
    let loggedIn = this._httpService.checkSession();
    loggedIn.subscribe(data =>{
      if(!data['loggedIn']){
        this._router.navigate(['/login']);
      }
      this.user = data['user'];
      this.getActiveMemoryGames();
      this.getActiveTTTGames();
      console.log(this.user);
    })
  }
  logout(){
    localStorage.removeItem("user");
    let logout = this._httpService.logout();
    logout.subscribe(data =>{
      if(!data['loggedIn']){
        this._router.navigate(['/login']);
      }
      
    })
  }
  getOpenTTT(){
    let openTTT = this._httpService.openTTT();
    openTTT.subscribe(data =>{
      this.TTTGames = data['games']
      console.log(this.TTTGames);
    })
  }
  getOpenMemory(){
    let openMemory = this._httpService.openMemory();
    openMemory.subscribe(data =>{
      this.Mgames = data['games']
    })
  }
  getActiveMemoryGames(){
    console.log("user.ts")
    let activeGames = this._httpService.activeMemoryGames(this.user._id);
    activeGames.subscribe(data =>{
      this.allMemoryGames = data['games']
    })
  }
  getActiveTTTGames(){
    console.log("user.ts")
    let activeGames = this._httpService.activeTTTGames(this.user._id);
    activeGames.subscribe(data =>{
      this.allTTTGames = data['games']
    })
  }
  openTTT(){
    let newTTT = this._httpService.newTTT();
    newTTT.subscribe(data =>{
      console.log(data);
      if(data['game']){
        this._router.navigate(['/ttt/'+ data['game']['_id']]);
      }
    })
  }
  joinMemory(id){
    let joinMemory = this._httpService.joinMemory(id, this.user);
    
    joinMemory.subscribe(data =>{
      if(data['game']){
        this._router.navigate(['/memory/'+ data['game']['_id']]);
        
        this.socket.emit('update-game', data['game']);
      }
    })
  }
  openMemory(){
    let board = this._memory.buildBoard();
    console.log(board);
    let newMemory = this._httpService.newMemory(board);
    newMemory.subscribe(data =>{
      console.log(data);
      if(data['game']){
        this._router.navigate(['/memory/'+ data['game']['_id']]);
        this.socket.emit('new-memory-games', this.Mgames.push(data['game']));
      }
    })
  }
  viewMemory(id){
    this._router.navigate(['/memory/'+ id]);
  }
  joinTTT(id){
    let join = this._httpService.joinTTT(id);
    join.subscribe(data =>{
      if(data['game']){
        this._router.navigate(['/ttt/'+ data['game']['_id']]);
      }
    })
  }

}
