//import { Component, OnInit } from '@angular/core';
import { Bearish } from '../bearish';
import { LongestBearishService } from '../longest-bearish.service';
import { Observable } from 'rxjs';
//import { date } from '../date';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-longest-bearish',
  templateUrl: './longest-bearish.component.html',
  styleUrls: ['./longest-bearish.component.css']
})
export class LongestBearishComponent implements OnInit {

  //bearish: Bearish = {
  @Input() startDate: String = "";
  @Input() endDate: String = "";
  //}

  unixStart: number = 0;
  unixEnd: number = 0;
  string: String = "";
  obj: Object = "";
  json: any;
  price: Array<String> = [];

  verrattava: String = "";
  montako: number = 0;
  listamontako: Array<number> = [];
  days: Array<String> = [];
  allTheDays: Array<Array<String>>= [];

  date1: String = "";
  date2: String = "";


  //response = this.x.getPrice().subscribe(data => {console.log(data)});

  // response2 = this.response.pipe(x => console.log(x.pipe(_)));
  constructor(
    private lbservice: LongestBearishService) { }

  ngOnInit(): void {
    this.lbservice.getJson().subscribe(data => {
      this.json = JSON.parse(JSON.stringify(data))
      //this.setString(JSON.stringify(data) )      
      this.getPrices(JSON.stringify(this.json.prices));
      //console.log(this.listamontako);
      this.setString(this.listamontako.sort().reverse()[0].toString());
      this.longestBearish();
      //console.log(this.days.toString());
      //console.log(this.listamontako.sort()[0].toString());
      //this.setString(JSON.stringify(this.json.prices))
    });

    this.obj = JSON.parse(JSON.stringify(this.lbservice.getJson()));
    //this.x.getPrice().subscribe(data => {console.log(data)});
    //this.getPrices();
    // console.log(JSON.stringify(this.response));
  }

  getPrices(stri: String) {
    this.price = stri.split(',');

    this.clearTheList();

    this.verrattava = this.price[1];
    this.days.push(this.price[0]);
    for (let j = 1; j < this.price.length; j++) {
      if (j % 2 != 0 && this.price[j] < this.verrattava) {

        //tyhjätään päivä lista jotta voidaan aloittaa alusta uuden listan kohdalla
        if (this.days.length != 0 && this.montako == 0) {
          this.allTheDays.push(this.days);
          //console.log(this.allTheDays)
          this.days = [];
        }
        //console.log(this.days.length);

        this.montako = this.montako + 1;
        this.verrattava = this.price[j];
        this.days.push(this.price[j - 1]);
      }
      else if (j % 2 != 0) {
        this.listamontako.push(this.montako);
        
        //this.days.push(this.price[j - 1]);
        this.montako = 0;
        
        this.verrattava = this.price[j];
      }
    }
  }

  clearTheList(){
    for (let i = 0; i < this.price.length; i++) {
      if (this.price[i].includes('[')) {
        //removes date imes
        //this.price.splice(i, 1);
        this.price[i] = this.price[i].replace('[', '');
        if (this.price[i].includes('[')) {
          this.price[i] = this.price[i].replace('[', '');
        }
      }
      if (this.price[i].includes(']')) {
        this.price[i] = this.price[i].replace(']', '');
      }
    }
  }

  setString(stri: String) {
    this.string = stri;
  }

  getUnix(date1: String, date2: String) {
    this.unixStart = new Date(date1 + " 00:00:00").getTime()/1000;
    this.unixEnd = new Date(date2 + " 00:00:00").getTime()/1000;
  }

  longestBearish(){
    //for (let list in this.allTheDays){
    let help = this.allTheDays.sort((a,b) => a.length - b.length).reverse()[0];
    this.date1 = help[0].toString();
    this.date2 = help[help.length-1].toString();
    
   // }
  }

  // getUnixStart() {
  //   return this.unixStart;
  // }
  // getUnixEnd() {
  //   return this.unixEnd;
  // }
}
