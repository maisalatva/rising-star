import { Component, OnInit, Input } from '@angular/core';
import { DataParserService } from '../data-parser.service';
import { DateService } from '../date.service';
import { LongestBearishService } from '../longest-bearish.service';

@Component({
  selector: 'app-trading-volume',
  templateUrl: './trading-volume.component.html',
  styleUrls: ['./trading-volume.component.css']
})
export class TradingVolumeComponent implements OnInit {

  @Input() startDate: String = "";
  @Input() endDate: String = "";

  date: String = "";
  volume: String = "";

  clicked: Boolean = false;

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
      this.getHighestTradingVolume(JSON.stringify(json.total_volumes));
    });
  }

  search(){
    let unixStart = this.dateService.getUnixTime(this.startDate);
    let unixEnd = this.dateService.getUnixTime(this.endDate);
    this.getData(unixStart, unixEnd);
    this.clicked = true;
  }

  sortPerDay(stri: String){
    let daysAndPrices = this.dataService.parseTheData(stri);
    let mapOfDaysAndPrices = new Map<String, Number>();
    for(let i = 1; i < daysAndPrices.length; i+=2){
      let currentKey = this.dateService.getTime(daysAndPrices[i-1])
        .toLocaleDateString("en-US");
      let x = mapOfDaysAndPrices.get(currentKey);
      if (x == undefined){
        mapOfDaysAndPrices.set(currentKey, 
            Number(daysAndPrices[i]));
      }
      else{
        mapOfDaysAndPrices.set(currentKey, 
            Number(x)+Number(daysAndPrices[i]));
      }
      
    }
    return mapOfDaysAndPrices;
  }

  getHighestTradingVolume(stri: String) {

    let volumePerDay = this.sortPerDay(stri);
  
    let compareVolume: Number = 0;
    let compareDay: String = "";

    for(let key of volumePerDay.keys()){
      let value = volumePerDay.get(key);
      if(value != undefined){
        if (value > compareVolume){
          compareVolume = value;
          compareDay = key;
        }
      }
    }
    this.volume = compareVolume.toString();
    this.date = compareDay;
  }

}
