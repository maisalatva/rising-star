import { LongestBearishService } from '../longest-bearish.service';
import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../date.service';

@Component({
  selector: 'app-longest-bearish',
  templateUrl: './longest-bearish.component.html',
  styleUrls: ['./longest-bearish.component.css']
})
export class LongestBearishComponent implements OnInit {

  @Input() startDate: String = "";
  @Input() endDate: String = "";

  string: String = "";

  howManyDays: number = 0;

  allTheDays: Array<Array<Number>> = [];

  bearishBeginDate: Date = new Date();
  bearishEndDate: Date = new Date();

  clicked: Boolean = false;
  noBearish: Boolean = false;

  constructor(
    private lbservice: LongestBearishService,
    private dateService: DateService) { }


  ngOnInit(): void {
  }

  search(){
    //reset all variables before new search
    this.allTheDays = [];
    this.howManyDays = 0;
    let unixStart = this.dateService.getUnixTime(this.startDate);
    let unixEnd = this.dateService.getUnixTime(this.endDate);
    this.getData(unixStart, unixEnd);
  }

  getData(unixStart: number, unixEnd: number) {
    this.lbservice.getJson(unixStart.toString(), 
      unixEnd.toString()).subscribe(data => {
      let json = JSON.parse(JSON.stringify(data));    
      this.countBearishTrends(json.prices);
      if(Number(this.allTheDays.sort((a, b) => 
        a.length - b.length).reverse()[0].length) > 1){
        this.noBearish = false;
        this.clicked = true;
        this.setDaysForLongestBearish();
      }
      else{
        this.clicked = false;
        this.noBearish = true;
      }
      this.string = this.howManyDays.toString();
    });
  }

  countBearishTrends(json: any) {
    let priceToCompare = json[0][1];

    let days = [];

    let helpList: any[] = [];
    for(let i = 1; i < json.length; i++){
      let firstDate = this.dateService.getTime(json[i-1][0].toString());
      let secondDate = this.dateService.getTime(json[i][0].toString());
      //compare with precision of date
      if(firstDate.toLocaleDateString("en-US") != secondDate.toLocaleDateString("en-US")){
        helpList.push(json[i-1]);
      }
    }

    for (let j = 1; j < helpList.length; j++) {
      if (helpList[j][1] < priceToCompare) {
        days.push(helpList[j][0]);
      }
      else{
        this.allTheDays.push(days);
        days = [];
      }
      priceToCompare = helpList[j][1];
    }

    this.allTheDays.push(days);
    this.howManyDays = this.allTheDays.sort((a, b) => 
      a.length - b.length).reverse()[0].length;
  }

  setDaysForLongestBearish() {
    let sortedListOfDays = this.allTheDays.sort((a, b) => 
      a.length - b.length).reverse()[0];
    
    this.bearishBeginDate = this.dateService.getTime(sortedListOfDays[0].toString());
    this.bearishEndDate = this.dateService.
      getTime(sortedListOfDays[sortedListOfDays.length - 1].toString());
  }

}