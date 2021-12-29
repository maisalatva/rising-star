import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataParserService {

  constructor() { }

  parseTheData(stri: String) {
    let daysAndPrices = stri.split(',');

    return this.polishTheList(daysAndPrices);
  }

  polishTheList(daysAndPrices: Array<String>) {
    for (let i = 0; i < daysAndPrices.length; i++) {
      if (daysAndPrices[i].includes('[')) {
        daysAndPrices[i] = daysAndPrices[i].replace('[', '');
        if (daysAndPrices[i].includes('[')) {
          daysAndPrices[i] = daysAndPrices[i].replace('[', '');
        }
      }
      if (daysAndPrices[i].includes(']')) {
        daysAndPrices[i] = daysAndPrices[i].replace(']', '');
        if (daysAndPrices[i].includes(']')) {
          daysAndPrices[i] = daysAndPrices[i].replace(']', '');
        }
      }
    }
    return daysAndPrices;
  }
}
