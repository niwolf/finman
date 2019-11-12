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
  switchMap,
  tap
} from 'rxjs/operators';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector:    'fin-activity',
  templateUrl: './activity-table.component.html',
  styleUrls:   ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {

  @Input()
  public limit;

  filterForm = new FormGroup({
    from: new FormControl(),
    to: new FormControl()
  });

  items: Observable<Item[]>;

  displayedColumns: string[] = ['date', 'origin', 'title', 'value'];
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  public ngOnInit(): void
  {
    const today = new Date();
    const before = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    this.filterForm.setValue({
      from: before,
      to: today
    });

    const uid: string = this.auth.auth.currentUser.uid;

    const filter$ = merge(this.filterForm.valueChanges, of(this.filterForm.value));
    const items$: Observable<Array<Item>> = filter$.pipe(
      map(value =>
        this.afs.collection<Item>(`users/${uid}/items`, ref =>
        {
          let query: CollectionReference | Query = ref.orderBy('date', 'desc');
          if (this.limit) { query = query.limit(this.limit); }
          if (value) { query = query.where('date', '<=', value.to)
                                    .where('date', '>=', value.from); }
          return query;
        })
      ),
      switchMap(collection => collection.valueChanges())
    );

    this.items = items$.pipe(
      map((items: Item[]) => items.sort((a: Item, b: Item) => b.date.seconds - a.date.seconds))
    );
  }
}
