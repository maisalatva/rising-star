import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getUnixTime(n: String){
    return new Date(n + " 00:00:00").getTime();
  }
}
