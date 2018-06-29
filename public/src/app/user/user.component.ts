import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MemoryComponent } from '../memory/memory.component';
@Component({
  providers:[MemoryComponent],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user;
  TTTGames;
  Mgames;
  allGames;
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
    this.getActiveGames();
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
  getActiveGames(){
    let activeGames = this._httpService.activeGames(this.user.id);
    activeGames.subscribe(data =>{
      this.allGames = data['games']
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
      }
    })
  }

}
