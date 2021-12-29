import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LongestBearishService {

  finalUrl:String = "";

  constructor(
    private http: HttpClient) { }
      
  getJson(datef: String, datet: String) {
    //10800 = one hour to unix time
    datet = (Number(datet)+10800).toString();
    var finalUrl;
    var baseUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?'
    var currency = 'vs_currency=' + 'eur' //vs_currency=eur
    var dateFrom = '&from=' + datef // from=1577836800
    var dateTo = '&to=' + datet // to=1609376400
    finalUrl = baseUrl + currency + dateFrom + dateTo;
    return this.http.get(finalUrl);
  }
}
