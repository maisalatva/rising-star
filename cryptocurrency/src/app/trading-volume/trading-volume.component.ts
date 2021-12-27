import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { DateComponent } from '../date/date.component';
import { LongestBearishService } from '../longest-bearish.service';

@Component({
  selector: 'app-trading-volume',
  templateUrl: './trading-volume.component.html',
  styleUrls: ['./trading-volume.component.css']
})
export class TradingVolumeComponent implements OnInit {

  @Input() startDate: String = "";
  @Input() endDate: String = "";

  unixStart: number = 0;
  unixEnd: number = 0;

  json: any;
  //string: String = "";
  date: Date = new Date();
  volume: String = "";

  //getDaysAndPrices
  price: Array<String> = [];
  verrattava: String = "";
  //montako: number = 0;
  //listamontako: Array<number> = [];
  days: String = "";
  //allTheDays: Array<Array<String>> = [];

  constructor(
    private dateComponent: DateComponent,
    private lbservice: LongestBearishService) { }

  ngOnInit(): void {
  }

  getData() {
    this.lbservice.getJson(this.unixStart.toString(), this.unixEnd.toString()).subscribe(data => {
      this.json = JSON.parse(JSON.stringify(data));
      this.getDaysAndPrices(JSON.stringify(this.json.total_volumes));
    });
  }

  search(){
    this.unixStart = this.dateComponent.getUnixStart(this.startDate);
    this.unixEnd = this.dateComponent.getUnixEnd(this.endDate);
    this.getData();
  }


  getDaysAndPrices(stri: String) {
    //console.log(stri);
    this.price = stri.split(',');

    this.polishTheList();

    this.verrattava = this.price[1];
    //this.days.push(this.price[0]);
    for (let j = 1; j < this.price.length; j++) {
      if (j % 2 != 0 && this.price[j] > this.verrattava) {

        //tyhjätään päivä lista jotta voidaan aloittaa alusta uuden listan kohdalla
        this.days = this.price[j-1];
        console.log(this.days);
        this.verrattava = this.price[j];
        console.log(this.verrattava);
      }
    }
    this.volume = this.verrattava;
    console.log(Number(this.days)*1000);
    this.date = new Date(Number(this.days));
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
