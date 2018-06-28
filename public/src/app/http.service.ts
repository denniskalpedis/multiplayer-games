import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  createUser(user){
    console.log('in service')
    return this._http.post('/api/user/create',user);
  }
  getUser(){
    return this._http.get('/api/user/loggedIn');
  }
  checkSession(){
    return this._http.get('/api/user/session');
  }
  logIn(user){
    return this._http.post('/api/user/login',user);
  }
  logout(){
    return this._http.get('api/user/logout');
  }
}
