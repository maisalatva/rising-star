import { Component, OnInit, Input } from '@angular/core';
import { DataParserService } from '../data-parser.service';
import { DateService } from '../date.service';
import { LongestBearishService } from '../longest-bearish.service';

@Component({
  selector: 'app-time-machine',
  templateUrl: './time-machine.component.html',
  styleUrls: ['./time-machine.component.css']
})
export class TimeMachineComponent implements OnInit {

  @Input() startDate: String = "";
  @Input() endDate: String = "";

  highestPriceDay: String = "";
  lowestPriceDay: String = "";
  biggestProfit: Number = 0;

  timeToSell: Date = new Date();
  timeToBuy: Date = new Date();

  clicked: Boolean = false;
  noProfit: Boolean = false;

  constructor(
    private dateService: DateService,
    private lbservice: LongestBearishService,
    private dataService: DataParserService) { }

  ngOnInit(): void {
  }

  getData(unixStart: Number, unixEnd: Number) {
    this.lbservice.getJson(unixStart.toString(), 
      unixEnd.toString()).subscribe(data => {
      let json = JSON.parse(JSON.stringify(data));
      this.convertStringToProfitMap(JSON.stringify(json.prices));
      this.setDaysForTimeMachine();
    });
  }

  search() {
    this.noProfit = false;
    this.highestPriceDay = "";
    this.lowestPriceDay = "";
    this.biggestProfit = 0;
    let unixStart = this.dateService.getUnixTime(this.startDate);
    let unixEnd = this.dateService.getUnixTime(this.endDate);
    this.getData(unixStart, unixEnd);
    if(this.noProfit == false){
      this.clicked = true;
    }
  }

  setDaysForTimeMachine() {
    this.timeToSell = this.dateService.getTime(this.highestPriceDay);
    this.timeToBuy = this.dateService.getTime(this.lowestPriceDay);
  }

  convertStringToProfitMap(stri: String) {
    let daysAndPrices = this.dataService.parseTheData(stri);

    let days = "";
    let mapOfDaysAndProfits = new Map<String, Number>()
    let profit = Number(daysAndPrices[1]);
    // j % 2 != 0 when list item is price, otherwise unix date
    for(let i = daysAndPrices.length-1; i >= 0; i-=2){
      let endValue = Number(daysAndPrices[daysAndPrices.length-1]);
      for(let j = 1; j < i; j+=2){
        if(Number(daysAndPrices[j]) < endValue){
          profit = endValue-Number(daysAndPrices[j]);
          days = daysAndPrices[i-1] + "," + daysAndPrices[j-1];
          mapOfDaysAndProfits.set(days, profit);
        }
      }
    }

    if(mapOfDaysAndProfits.size == 0){
      this.noProfit = true;
      this.clicked = false;
    }

    this.getBiggestProfit(mapOfDaysAndProfits);
  }

  getBiggestProfit(mappi: Map<String, Number>){
    let days = "";
    for(let key of mappi.keys()){
      if(Number(mappi.get(key)) > this.biggestProfit){
        this.biggestProfit = Number(mappi.get(key));
        days = key.toString();
      }
    }
    this.lowestPriceDay = days.split(',')[1];
    this.highestPriceDay = days.split(',')[0];
  }
}
