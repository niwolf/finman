import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  Query
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';
import {
  merge,
  Observable,
  of
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  map,
  switchMap
} from 'rxjs/operators';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';

@Component({
  selector:    'fin-activity',
  templateUrl: './activity-table.component.html',
  styleUrls:   ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {

  @Input() limit: number;
  @Input() dense: boolean;

  filterForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  });

  items: Observable<Item[]>;

  displayedColumns$: Observable<string[]> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    map(({matches}) => matches ? ['date', 'title', 'value'] : ['date', 'origin', 'title', 'value'])
  );

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit(): void
  {
    const today = new Date();
    const aMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate(), 0, 0, 0);
    this.filterForm.setValue({
      from: aMonthAgo,
      to: today
    });

    const uid: string = this.auth.auth.currentUser.uid;

    const filterFormChanges$ = this.filterForm.valueChanges.pipe(map(value => {
      return {
        from: new Date(value.from.getFullYear(), value.from.getMonth(), value.from.getDate(), 0, 0, 0),
        to: new Date(value.to.getFullYear(), value.to.getMonth(), value.to.getDate(), 23, 59, 59)
      };
    }));
    const filter$ = merge(filterFormChanges$, of(this.filterForm.value));
    this.items = filter$.pipe(
      map(value => this.afs.collection<Item>(`users/${uid}/items`, ref => this.buildQuery(ref, value))),
      switchMap(collection => collection.valueChanges())
    );
  }

  private buildQuery(ref: CollectionReference, value: {from: Date, to: Date}): Query
  {
    let query: Query = ref.orderBy('date', 'desc');
    if (this.limit) {
      query = query.limit(this.limit);
    }
    if (value) {
      query = query.where('date', '<=', value.to)
                   .where('date', '>=', value.from);
    }
    return query;
  }
}
