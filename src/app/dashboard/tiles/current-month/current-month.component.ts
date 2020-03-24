import { Component } from '@angular/core';
import { Item } from '../../../models/item.interface';
import { Observable } from 'rxjs';
import { ItemService } from '../../../services/item.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  map,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'fin-current-month',
  templateUrl: './current-month.component.html',
  styleUrls: ['./current-month.component.scss']
})
export class CurrentMonthComponent {

  public currentMonth$: Observable<{expenses: number, revenues: number, balance: number}> = this.auth.user.pipe(
    switchMap(user => this.currentMonth(user.uid))
  );

  constructor(private itemService: ItemService,
              private auth: AngularFireAuth)
  {
  }


  public currentMonth(userId: string): Observable<{expenses: number, revenues: number, balance: number}>
  {
    const today: Date = new Date();
    const currentMonth: Date = new Date(today.getFullYear(), today.getMonth());
    const nextMonth: Date = new Date(today.getFullYear(), today.getMonth() + 1);
    return this.itemService.getItems(userId, ref => ref
      .where('date', '>', currentMonth)
      .where('date', '<', nextMonth)
    ).pipe(
      map(items =>
      {
        const reducer: (acc, cur) => number = (acc, cur) => acc += cur.value;
        const expenses: number = items.filter(item => item.value < 0).reduce(reducer, 0) * -1;
        const revenues: number = items.filter(item => item.value > 0).reduce(reducer, 0);
        return{
          expenses,
          revenues,
          balance: revenues - expenses
        };
      })
    );
  }

}
