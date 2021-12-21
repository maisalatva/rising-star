import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LongestBearishService {

  constructor(
    private http: HttpClient) { }

      private bearishUrl = '/coins/{id}/market_chart/range';
      // private bearishUrl = '/coins/{id}/market_chart/range';
      private baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?'
      private currency = 'vs_currency=' + 'eur' //vs_currency=eur
      //private dateFrom = '&from=' + '1577836800' // from=1577836800
      private dateFrom = '&from=' + '1583013600' // from=1577836800
      //private dateTo = '&to=' + '1609376400' // to=1609376400
      private dateTo = '&to=' + '	1627765200' // to=1609376400
      private finalUrl = this.baseUrl + this.currency + this.dateFrom + this.dateTo;
      // vs_currency=eur&from=1577836800&to=1609376400

      
  getJson() {
    // return this.http.get(this.finalUrl).pipe(stuff => JSON.parse(stuff.forEach.toString))
    // return this.http.get(this.finalUrl).pipe((res:Response)=> res.json());
    return this.http.get(this.finalUrl);
  }
}
