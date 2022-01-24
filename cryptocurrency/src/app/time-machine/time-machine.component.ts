import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../date.service';
import { JsonService } from '../json.service';

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
    private jsonService: JsonService) { }

  ngOnInit(): void {
  }

  getData(unixStart: Number, unixEnd: Number) {
    this.jsonService.getJson(unixStart.toString(), 
      unixEnd.toString()).subscribe(data => {
      let json = JSON.parse(JSON.stringify(data));
      this.convertStringToProfitMap(json.prices);
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

  convertStringToProfitMap(json: any) {
    let days = "";
    let mapOfDaysAndProfits = new Map<String, Number>()
    let profit = Number(json[0][1]);
    for(let i = json.length-1; i >= 0; i--){
      let endValue = Number(json[json.length-1][1]);
      for(let j = 0; j < i; j++){
        if(Number(json[j][1]) < endValue){
          profit = endValue-Number(json[j][1]);
          days = json[i][0] + "," + json[j][0];
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
