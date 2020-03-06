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
import * as md5 from 'md5';
import * as moment from 'moment';
import { QueryFn } from '@angular/fire/firestore';
import { ItemService } from './item.service';
import { AuthService } from './auth.service';
import {
  map,
  switchMap,
  take
} from 'rxjs/operators';
import Timestamp = firestore.Timestamp;
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  constructor(private papa: Papa, private itemService: ItemService, private authService: AuthService) {}

  public import(file: File) {
    const config: ParseConfig = {
      complete: (results) => this.handleParseResult(results),
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
      const date: Date = moment(entry[dateIndex], 'DD.MM.YY').toDate();
      const timestamp: Timestamp = Timestamp.fromDate(date);
      return {
        importId: md5(entry.toString()),
        title:    entry[receiverIndex],
        value:    parseFloat(entry[valueIndex].replace(',', '.')),
        date:     timestamp,
        origin:   Origin.account
      };
    });
    console.log('Items: ', items);

    const uid: string = this.authService.currentUser.uid;
    this.getExistingItems(uid, items).pipe(
      switchMap(existingItems => {
        if (existingItems.length > 0)
        {
          const filtered: Item[] = items.filter(item => !existingItems.find(existingItem => existingItem.importId === item.importId));
          return filtered.map(item => this.itemService.addItem(uid, item));
        }
        return items.map(item => this.itemService.addItem(uid, item));
      })
    ).subscribe();
  }

  private getExistingItems(userId: string, items: Item[]): Observable<Item[]> {
    const queryFn: QueryFn = this.createExistingItemQuery(items);

    return this.itemService.getItems(userId, queryFn).pipe(
      take(1),
      map(existingItems => existingItems.filter(item => !isNullOrUndefined(item.importId)))
    );
  }

  private createExistingItemQuery(items: Item[]) {
    const now: number = Timestamp.now().toMillis();
    const startDate: number = items.reduce((min: number, cur: Item) => Math.min(min, cur.date.toMillis()), now);
    const endDate: number = items.reduce((max: number, cur: Item) => Math.max(max, cur.date.toMillis()), startDate);

    return (ref) => {
      return ref
        .where('date', '>=', Timestamp.fromMillis(startDate))
        .where('date', '<=', Timestamp.fromMillis(endDate));
    };
  }
}
