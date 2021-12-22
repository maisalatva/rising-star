import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LongestBearishService {

  datef: String = "";
  datet: String = "";
  finalUrl:String = "";

  constructor(
    private http: HttpClient) { }

      //private bearishUrl = '/coins/{id}/market_chart/range';
      // private bearishUrl = '/coins/{id}/market_chart/range';
      //private currency = 'vs_currency=' + 'eur' //vs_currency=eur
      //private dateFrom = '&from=' + '1577836800' // from=1577836800
     //private dateFrom = '&from=' + this.datef // from=1577836800
      //private dateTo = '&to=' + '1609376400' // to=1609376400
      //private dateTo = '&to=' + this.datet // to=1609376400
      //private finalUrl = this.baseUrl + this.currency + this.dateFrom + this.dateTo;
      // vs_currency=eur&from=1577836800&to=1609376400

      
  getJson(datef: String, datet: String) {
    var finalUrl;
    var baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?'
    var currency = 'vs_currency=' + 'eur' //vs_currency=eur
      //private dateFrom = '&from=' + '1577836800' // from=1577836800
    var dateFrom = '&from=' + datef // from=1577836800
      //private dateTo = '&to=' + '1609376400' // to=1609376400
    var dateTo = '&to=' + datet // to=1609376400
    finalUrl = baseUrl + currency + dateFrom + dateTo;
    //console.log(finalUrl);
    // return this.http.get(this.finalUrl).pipe(stuff => JSON.parse(stuff.forEach.toString))
    // return this.http.get(this.finalUrl).pipe((res:Response)=> res.json());
    return this.http.get(finalUrl);
  }
}
