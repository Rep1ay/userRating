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

  radius: number;
  color: string;
  constructor() {
    this.value = localStorage.winnersCount ? localStorage.winnersCount : 10;
    this.valueFrom = localStorage.winnersRangeFrom? localStorage.winnersRangeFrom:  1;
    this.valueTo = localStorage.winnersRangeTo? localStorage.winnersRangeTo : this.value;
  }

  ngOnInit() {
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
