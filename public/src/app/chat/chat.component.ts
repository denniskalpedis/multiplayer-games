import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  chats:any;
  joinned: boolean = false;
  newUser = { nickname: '', room: '' };
  msgData = { room: '', nickname: '', message: '' };
  socket = io.connect();

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!=null) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      // if(this.joined){
        if(data.message["_body"]){
          var temp = JSON.parse(data.message["_body"]);
        } else {
          var temp = data["message"];
        }
        console.log(temp);
        if(temp.room === JSON.parse(localStorage.getItem("user")).room && this.chats) {
          this.chats.push(temp);
          this.msgData = { room: user.room, nickname: user.nickname, message: '' }
          this.scrollToBottom();
        }
      // }
    }.bind(this));
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChatByRoom(room) {
    let observable = this.chatService.getChatByRoom(room);
    observable.subscribe(data => {
      this.chats = JSON.parse(data["_body"]);
    });
  }

  joinRoom() {
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room'});
  }

  sendMessage() {
    let observable = this.chatService.saveChat(this.msgData);
    observable.subscribe(data => {
      this.socket.emit('save-message', data);
    });
  }

  logout() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room'});
    localStorage.removeItem("user");
    this.joinned = false;
    console.log(localStorage.getItem("user"));
  }

}
