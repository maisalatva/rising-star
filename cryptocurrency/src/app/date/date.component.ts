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

  getUnixStart(date: String) {
    return (new Date(date + " 00:00:00").getTime() / 1000);
  }
  getUnixEnd(date: String){
    return (new Date(date + " 00:00:00").getTime() / 1000);
  }
}
