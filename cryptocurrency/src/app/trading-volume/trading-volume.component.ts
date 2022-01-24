import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../date.service';
import { JsonService } from '../json.service';

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
    private jsonService: JsonService) { }

  ngOnInit(): void {
  }

  getData(unixStart: Number, unixEnd: Number) {
    this.jsonService.getJson(unixStart.toString(), 
      unixEnd.toString()).subscribe(data => {
      let json = JSON.parse(JSON.stringify(data));
      this.getHighestTradingVolume(json.total_volumes);
    });
  }

  search(){
    let unixStart = this.dateService.getUnixTime(this.startDate);
    let unixEnd = this.dateService.getUnixTime(this.endDate);
    this.getData(unixStart, unixEnd);
    this.clicked = true;
  }

  sortPerDay(json: any){
    let mapOfDaysAndPrices = new Map<String, Number>();
    for(let i = 0; i < json.length; i++){
      let currentKey = this.dateService.getTime(json[i][0])
        .toLocaleDateString("en-US");
      let x = mapOfDaysAndPrices.get(currentKey);
      if (x == undefined){
        mapOfDaysAndPrices.set(currentKey, 
            Number(json[i][1]));
      }
      else{
        mapOfDaysAndPrices.set(currentKey, 
            Number(x)+Number(json[i][1]));
      }
    }
    return mapOfDaysAndPrices;
  }

  getHighestTradingVolume(json: any) {

    let volumePerDay = this.sortPerDay(json);
  
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
