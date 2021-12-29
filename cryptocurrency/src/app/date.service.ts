import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getUnixTime(date: String){
    return (new Date(date + " 00:00:00").getTime()/1000);
  }

  getTime(date: String){
    return (new Date(Number(date)));
  }
}
