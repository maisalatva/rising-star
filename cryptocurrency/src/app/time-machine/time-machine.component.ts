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

  comment: String = "";

  clicked: Boolean = false;

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
    this.clicked = true;
  }


  timeMachine() {
    //for (let list in this.allTheDays){
    //let help = this.allTheDays.sort((a, b) => a.length - b.length).reverse()[0];
    //this.date2 = new Date(Number(help[0]));
    //this.date1 = new Date(Number(help[help.length - 1]));

    this.timeToSell = new Date(Number(this.highestPriceDay));
    this.timeToBuy = new Date(Number(this.lowestPriceDay));
    // }
  }

  getDayAndPrice(stri: String) {
    this.price = stri.split(',');

    this.polishTheList();
    //let comparePrice = Number(this.price[this.price.length-1]);
    let paivat = "";
    let mappi = new Map<String, Number>()
    let profit = Number(this.price[1]);
    for(let i = this.price.length-1; i >= 0; i-=2){
      let comparePrice = Number(this.price[this.price.length-1]);
      for(let j = 1; j < i; j+=2){
        if(Number(this.price[j]) < comparePrice){
          profit = comparePrice-Number(this.price[j]);
          paivat = this.price[i-1] + "," + this.price[j-1];
          mappi.set(paivat, profit);
        }
      }
    }
    // for(let i = 1; i < this.price.length; i+=2){
    //   if(Number(this.price[i]) > comparePrice){
    //     if(paivat == ""){
    //       paivat = this.price[i-1].toString();
    //       profit = Number(this.price[i]);
    //       //console.log(profit);
    //     }
    //   }
    //   else{
    //     if(paivat != ""){
    //       mappi.set((paivat + "," + this.price[i-1]), (profit - Number(this.price[i])));
    //       paivat = "";
    //       profit = Number(this.price[i]);
    //     }
    //   }
    //   comparePrice = Number(this.price[i]);
    // }
    //console.log(mappi);
    this.getProfit(mappi);
  }

  getProfit(mappi: Map<String, Number>){
    console.log(mappi);
    let compareValue = 0;
    let compareKey = "";
    for(let key of mappi.keys()){
      if(Number(mappi.get(key)) > compareValue){
        compareValue = Number(mappi.get(key));
        compareKey = key.toString();
        console.log(compareKey)
      }
    }
    console.log(compareKey)
    this.lowestPriceDay = compareKey.split(',')[1];
    this.highestPriceDay = compareKey.split(',')[0];
    //console.log(this.lowestPriceDay);
    //console.log(this.highestPriceDay);
  }

  // getBestPrice() {

  //   let i = 0;
  //   while (this.price[i] != this.lowestPrice) {
  //     i++;
  //   }

  //   if (i != this.price.length) {

  //     this.highestPrice = this.price[i + 1];
  //     this.highestPriceDay = this.price[i];

  //     for (let j = i; j < this.price.length; j++) {
  //       if (j % 2 != 0 && this.price[j] > this.highestPrice) {
  //         this.highestPrice = this.price[j];
  //         this.highestPriceDay = this.price[j - 1];
  //       }
  //       // else if (j % 2 != 0) {
  //       //   this.verrattava = this.price[j];
  //       // }
  //     }
  //   }
  //   else{
  //     this.giveComment();
  //   }
  // }

  // giveComment(){
  //   this.comment = "You should not buy (nor sell) bitcoin on any of the days.";
  // }

  // getLowestPrice() {
  //   this.lowestPrice = this.price[1];
  //   this.lowestPriceDay = this.price[0];

  //   for (let j = 1; j < this.price.length; j++) {
  //     if (j % 2 != 0 && this.price[j] < this.lowestPrice) {
  //       this.lowestPrice = this.price[j];
  //       this.lowestPriceDay = this.price[j - 1];
  //     }
  //     // else if (j % 2 != 0) {
  //     //   this.verrattava = this.price[j];
  //     // }
  //   }
  // }

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
