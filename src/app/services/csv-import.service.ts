import { Injectable } from '@angular/core';
import {
  Papa,
  ParseConfig,
  ParseResult
} from 'ngx-papaparse';
import {
  Item,
  Origin
} from '../models/item.interface';
import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  constructor(private papa: Papa) {}

  public import(file: File) {
    const config: ParseConfig = {
      complete: (results, f) => this.handleParseResult(results),
      // Add your options here
      worker: true
    };

    this.papa.parse(file, config);
  }

  private handleParseResult(result: ParseResult): void {
    console.log('Parsed: ', result);
    const header: string[] = result.data.shift();
    const receiverIndex: number = header.indexOf('Beguenstigter/Zahlungspflichtiger');
    const valueIndex: number = header.indexOf('Betrag');
    const dateIndex: number = header.indexOf('Valutadatum');
    const items: Item[] = result.data.slice(0, result.data.length - 1).map((entry: string[]) => {
      const date: number = Date.parse(entry[dateIndex]);
      return {
        title: entry[receiverIndex],
        value: parseFloat(entry[valueIndex].replace(',', '.')),
        date: Timestamp.fromMillis(date),
        origin: Origin.account
      };
    });
    console.log('Items: ', items);
  }
}
