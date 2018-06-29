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
    return this._http.get('/api/user/logout');
  }
  newTTT(){
    return this._http.get('/api/TTT/new');
  }
  newMemory(board){
    return this._http.post('/api/Memory/new', board);
  }
  openTTT(){
    return this._http.get('/api/TTT/open');
  }
  openMemory(){
    return this._http.get('/api/Memory/open');
  }
  activeMemoryGames(id){
    console.log("http.service")
    return this._http.get('/api/Games/memory/active/' + id);
  }
  activeTTTGames(id){
    console.log("http.service")
    return this._http.get('/api/Games/ttt/active/' + id);
  }
  joinMemory(id, user){
    console.log("-------------");
    console.log("joining " + id);
    console.log("-------------");
    return this._http.put('/api/Memory/join/' + id, user);
  }
  getMemoryGame(id){
    return this._http.get('/api/Memory/game/' + id);
  }
  updateGame(id, data){
    return this._http.put('/api/memory/update/' + id, data)
  }
}
