import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user;
  TTTGames;
  Mgames;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkSession();
    this.getOpenTTT();
    // this.getOpenMemory();
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
  getOpenTTT(){
    let openTTT = this._httpService.openTTT();
    openTTT.subscribe(data =>{
      this.TTTGames = data['games']
      console.log(this.TTTGames);
    })
  }
  getOpenMemory(){

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
  joinTTT(id){
    let join = this._httpService.joinTTT(id);
    join.subscribe(data =>{
      if(data['game']){
        this._router.navigate(['/ttt/'+ data['game']['_id']]);
      }
    })
  }

}
