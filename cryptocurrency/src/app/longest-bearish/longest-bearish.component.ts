import { Component, OnInit } from '@angular/core';
import { Bearish } from '../bearish';
import { LongestBearishService } from '../longest-bearish.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-longest-bearish',
  templateUrl: './longest-bearish.component.html',
  styleUrls: ['./longest-bearish.component.css']
})
export class LongestBearishComponent implements OnInit {

  bearish: Bearish = {
    startDate: Date.now(),
    endDate: Date.now()
  }

  lause: String = "makkara";

  //response = this.x.getPrice().subscribe(data => {console.log(data)});
  
  // response2 = this.response.pipe(x => console.log(x.pipe(_)));
  constructor(
    private x: LongestBearishService  ) { }

  ngOnInit(): void {
    this.x.getPrice().subscribe(data => this.setLause(JSON.stringify(data)));
    //this.x.getPrice().subscribe(data => {console.log(data)});
    //this.getPrices();
    // console.log(JSON.stringify(this.response));
  }

  getPrices(): void{
    //this.x.getPrice().subscribe();
  }

  setLause(stri : String){
    this.lause = stri;
  }
}
