import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {
  value;
  valueFrom;
  valueTo;
  centered = true;
  disabled = false;
  unbounded = false;
  showWinners;
  winnersList = [];
  lastWinnersCount = 3;
  radius: number;
  color: string;
  constructor() {
    this.value = localStorage.winnersCount ? localStorage.winnersCount : 10;
    this.valueFrom = localStorage.winnersRangeFrom ? localStorage.winnersRangeFrom : 1;
    this.valueTo = localStorage.winnersRangeTo ? localStorage.winnersRangeTo : this.value;
  }

  ngOnInit() {
    for (let i = 1; i < this.lastWinnersCount+1; i++) {
      // if(!this.winnersList){
        this.winnersList.push({ userName: localStorage.getItem(`winner${i}`)})
        this.showWinners = true;
      // }else if (this.winnersList[i]) {
      //   this.winnersList[i].userName = localStorage.getItem(`winner${i}`)
      // }else{
      //   return;
      // }
    }
  }


  applyTop() {
    localStorage.winnersRangeFrom = this.valueFrom = 1;
    localStorage.winnersCount = localStorage.winnersRangeTo = this.value;
    this.valueTo = this.value;
  }
  applyRangeTop() {
    localStorage.winnersRangeFrom = this.valueFrom;
    localStorage.winnersRangeTo = localStorage.winnersCount = this.valueTo;
  }
}
