import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
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
  @Input()
  public limit;

  private itemsCollection: AngularFirestoreCollection<Item>;
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
    const uid: string = this.auth.auth.currentUser.uid;
    this.itemsCollection = this.afs.collection<Item>(`users/${uid}/items`, ref => this.limit ? ref.limit(this.limit) : ref);
    this.items = this.itemsCollection.valueChanges().pipe(
      map((items: Item[]) => items.sort((a: Item, b: Item) => b.date.seconds - a.date.seconds))
    );
  }
}
