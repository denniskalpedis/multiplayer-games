import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registrationError;
  loginError;
  user;
  login;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkSession();
    this.user = {
      email: '',
      username: '',
      password: '',
      passwordC: ''
    }
    this.login = {
      email: '',
      password: ''
    }
    this.registrationError = false;
    this.loginError = false;
  }
  checkSession(){
    let loggedIn = this._httpService.checkSession();
    loggedIn.subscribe(data =>{
      if(data['loggedIn']){
        this._router.navigate(['/user']);
      }
    })
  }
  onLogin(){
    let logIn = this._httpService.logIn(this.login);
    logIn.subscribe(data =>{
      if(!data['user']){
        this.loginError = data['error']
      }else{
        this._router.navigate(['/user']);
      }
    })
  }
  onRegistration(){
    let registration = this._httpService.createUser(this.user);
    registration.subscribe(data =>{
      if(!data['user']){
        this.registrationError = data['error']
      }else{
        this._router.navigate(['/user']);
      }
    })
  }
}
