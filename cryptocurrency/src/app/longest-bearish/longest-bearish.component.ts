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
    for (let i = 0; i < this.price.length; i++) {
      if (this.price[i].includes('[')) {
        //removes date imes
        this.price.splice(i, 1);
        //this.price[i].replace('[', '');
      }
      if (this.price[i].includes(']')) {
        this.price[i].replace(']', '');
      }
    }
    this.verrattava = this.price[0];
    for (let j = 0; j < this.price.length; j++) {
      if (this.price[j] < this.verrattava) {
        this.montako = this.montako + 1;
        this.verrattava = this.price[j];
      }
      else {
        this.listamontako.push(this.montako);
        this.montako = 0;
        this.verrattava = this.price[j];
      }
    }

  }

  setString(stri: String) {
    this.string = stri;
  }

  getUnix(date1: String, date2: String) {
    this.unixStart = new Date(date1 + " 00:00:00").getTime();
    this.unixEnd = new Date(date2 + " 00:00:00").getTime();
  }

  getUnixStart() {
    return this.unixStart;
  }
  getUnixEnd() {
    return this.unixEnd;
  }
}
