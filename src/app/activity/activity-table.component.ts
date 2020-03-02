import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  CollectionReference,
  Query
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { ItemService } from '../services/item.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector:    'fin-activity',
  templateUrl: './activity-table.component.html',
  styleUrls:   ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {
  @Input() limit: number;
  @Input() dense: boolean;

  displayedColumns$: Observable<string[]> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).pipe(
    map(({matches}) => matches ? ['date', 'title', 'value'] : ['date', 'origin', 'title', 'value'])
  );

  items: Observable<Item[]>;

  constructor(
    private itemService: ItemService,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit(): void
  {
    const uid: string = this.auth.currentUser.uid;
    this.items = this.itemService.getItems(uid, ref => this.buildQuery(ref)).valueChanges();
  }

  private buildQuery(ref: CollectionReference): Query
  {
    let query: Query = ref.orderBy('date', 'desc');
    if (this.limit) {
      query = query.limit(this.limit);
    }
    return query;
  }
}
