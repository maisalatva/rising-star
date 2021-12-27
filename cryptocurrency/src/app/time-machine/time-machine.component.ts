import { Component, OnInit, Input } from '@angular/core';
import { DateComponent } from '../date/date.component';
import { LongestBearishService } from '../longest-bearish.service';

@Component({
  selector: 'app-time-machine',
  templateUrl: './time-machine.component.html',
  styleUrls: ['./time-machine.component.css']
})
export class TimeMachineComponent implements OnInit {

  @Input() startDate: String = "";
  @Input() endDate: String = "";

  unixStart: number = 0;
  unixEnd: number = 0;

  json: any;
  //string: String = "";
  date: Date = new Date();
  higestPrice: String = "";

  //getDaysAndPrices
  price: Array<String> = [];
  highestPrice: String = "";
  //montako: number = 0;
  //listamontako: Array<number> = [];
  //days: String = "";
  highestPriceDay: String = "";
  lowestPrice: String = "";
  lowestPriceDay: String = "";
  allTheDays: Array<Array<String>> = [];

  timeToSell: Date = new Date();
  timeToBuy: Date = new Date();

  constructor(
    private dateComponent: DateComponent,
    private lbservice: LongestBearishService) { }

  ngOnInit(): void {
  }

  getData() {
    this.lbservice.getJson(this.unixStart.toString(), this.unixEnd.toString()).subscribe(data => {
      this.json = JSON.parse(JSON.stringify(data));
      this.getDayAndPrice(JSON.stringify(this.json.prices));
      this.timeMachine();
    });
  }

  search() {
    this.unixStart = this.dateComponent.getUnixStart(this.startDate);
    this.unixEnd = this.dateComponent.getUnixEnd(this.endDate);
    this.getData();
  }


  timeMachine() {
    //for (let list in this.allTheDays){
    //let help = this.allTheDays.sort((a, b) => a.length - b.length).reverse()[0];
    //this.date2 = new Date(Number(help[0]));
    //this.date1 = new Date(Number(help[help.length - 1]));

    this.timeToSell = new Date(Number(this.highestPriceDay));
    // }
  }

  getDayAndPrice(stri: String) {
    this.price = stri.split(',');

    this.polishTheList();

    this.getLowestPrice();
    this.getBestPrice();

  }

  getBestPrice() {

    let i = 0;
    while (this.price[i] != this.lowestPrice) {
      i++;
    }

    if (i != this.price.length) {

      this.highestPrice = this.price[i + 1];
      this.highestPriceDay = this.price[i];

      for (let j = i; j < this.price.length; j++) {
        if (j % 2 != 0 && this.price[j] > this.highestPrice) {
          this.highestPrice = this.price[j];
          this.highestPriceDay = this.price[j - 1];
        }
        // else if (j % 2 != 0) {
        //   this.verrattava = this.price[j];
        // }
      }
    }
    else{
      //TÄHÄN TULOSTUS MYYNNIN KANNATTAMATTOMUUDESTA
    }
  }

  getLowestPrice() {
    this.lowestPrice = this.price[1];
    this.lowestPriceDay = this.price[0];

    for (let j = 1; j < this.price.length; j++) {
      if (j % 2 != 0 && this.price[j] < this.lowestPrice) {
        this.lowestPrice = this.price[j];
        this.lowestPriceDay = this.price[j - 1];
      }
      // else if (j % 2 != 0) {
      //   this.verrattava = this.price[j];
      // }
    }
  }

  //sama kuin longest-bearishessä
  polishTheList() {
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
        if (this.price[i].includes(']')) {
          this.price[i] = this.price[i].replace(']', '');
        }
      }
    }
  }
}
