import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private _http: Http) { }
  getChatByRoom(room) {
    return this._http.get('/chat/' + room);
  }

  saveChat(data) {
    return this._http.post('/chat', data);
  }
}
