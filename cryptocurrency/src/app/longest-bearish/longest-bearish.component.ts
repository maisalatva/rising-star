import { LongestBearishService } from '../longest-bearish.service';
import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../date.service';
import { DataParserService } from '../data-parser.service';

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

  allTheDays: Array<Array<String>> = [];

  bearishBeginDate: Date = new Date();
  bearishEndDate: Date = new Date();

  clicked: Boolean = false;

  constructor(
    private lbservice: LongestBearishService,
    private dateService: DateService,
    private dataService: DataParserService) { }


  ngOnInit(): void {
  }

  getData(unixStart: number, unixEnd: number) {
    this.lbservice.getJson(unixStart.toString(), 
      unixEnd.toString()).subscribe(data => {
      let json = JSON.parse(JSON.stringify(data));    
      this.countBearishTrends(JSON.stringify(json.prices));
      this.setDaysForLongestBearish();
      this.setString(this.howManyDays.toString());
    });
  }

  search(){
    let unixStart = this.dateService.getUnixTime(this.startDate);
    let unixEnd = this.dateService.getUnixTime(this.endDate);
    this.getData(unixStart, unixEnd);
    this.clicked = true;
  }

  countBearishTrends(stri: String) {
    let daysAndPrices = this.dataService.parseTheData(stri);

    let priceToCompare = daysAndPrices[1];

    let days = [];
    let listOfNumbers = [];

    days.push(daysAndPrices[0]);
    for (let j = 1; j < daysAndPrices.length; j++) {
      if (j % 2 != 0 && daysAndPrices[j] < priceToCompare) {

        if (days.length != 0 && this.howManyDays == 0) {
          this.allTheDays.push(days);
          days = [];
        }

        this.howManyDays = this.howManyDays + 1;
        priceToCompare = daysAndPrices[j];
        days.push(daysAndPrices[j - 1]);
      }
      else if (j % 2 != 0) {
        listOfNumbers.push(this.howManyDays);
        this.howManyDays = 0;
        priceToCompare = daysAndPrices[j];
      }
    }
  }

  setString(stri: String) {
    this.string = stri;
  }

  setDaysForLongestBearish() {
    let sortedListOfDays = this.allTheDays.sort((a, b) => 
      a.length - b.length).reverse()[0];
    
    //choose first price of the day
    let helpList = [];
    for(let i = 1; i <= sortedListOfDays.length; i++){
      let firstDate = this.dateService.getTime(sortedListOfDays[i-1]);
      let secondDate = this.dateService.getTime(sortedListOfDays[i]);
      //compare with precision of date
      if(firstDate.toLocaleDateString("en-US") != secondDate.toLocaleDateString("en-US")){
        helpList.push(firstDate);
      }
    }

    this.howManyDays = helpList.length;
    this.bearishBeginDate = this.dateService.getTime(sortedListOfDays[0]);
    this.bearishEndDate = this.dateService.getTime(sortedListOfDays[sortedListOfDays.length - 1]);
  }

}
