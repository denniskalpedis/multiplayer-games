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
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkSession;
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

}
