import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {

  constructor(private _commonModule: CommonModule) { }
  layout = [];
  images = [];
  testing = [];
  p1Score = 0;
  p2Score = 0;
  firstPick;
  secondPick;
  waiting = false;
  player1={color:"red", name: "Player 2"};
  player2={color:"green", name:"Player 1"};
  turn = 1;
  ngOnInit() {
    for(var i = 0; i < 54; i++){
      this.images[i] = "/assets/images/dogs/" + i + ".png"
    }
    this.shuffle(this.images);
    for(let i = 0; i < 15; i++){
      this.layout.push(i);
      this.layout.push(i);
    }
    this.shuffle(this.layout);
    for(let i = 0; i <this.layout.length; i++){
      this.testing.push({match: this.layout[i], image: this.images[this.layout[i]], active: "none", player:0});
    }
  }
  onClick(event){
    console.log(event.srcElement.classList);
    if(this.testing[event.target.id].active == "none" && !this.waiting){
      if(this.firstPick){
        this.secondPick = event.target.id;
        this.testing[event.target.id].active = this.testing[event.target.id].image
        console.log(this.firstPick);
        console.log(this.secondPick);
        if (this.testing[this.firstPick].match == this.testing[this.secondPick].match ){
          if (this.turn == 1){
            this.p1Score ++;
          } else {
            this.p2Score ++;
          }
          
          this.testing[this.firstPick].player = this.turn;
          this.testing[this.secondPick].player = this.turn;
          this.firstPick= null;
          this.secondPick= null;
          
          console.log("WIN!")
          return true;
        } else {
          
          this.waiting = true;
          console.log("LOSE!");
          setTimeout(lost=>{ this.testing[this.firstPick].active = "none";
          this.testing[this.secondPick].active = "none";
          this.firstPick= null;
          this.secondPick= null;
          this.waiting = false;
          if(this.turn == 1){
            this.turn = 2;
          }else{
            this.turn = 1;
          }; }, 1500);
        }
      } else {
        console.log(this.firstPick);
        console.log(this.secondPick);
        this.testing[event.target.id].active = this.testing[event.target.id].image
        this.firstPick = event.target.id;
      }
    }
  }
  shuffle(arr){
    var currentIndex = arr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }

}
