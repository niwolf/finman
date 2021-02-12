import { Component, Input } from '@angular/core';
import { CollectionReference, Query } from '@angular/fire/firestore';
import { Item } from '@core/models/item.interface';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ItemService } from '@core/services/item.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'fin-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss'],
})
export class ActivityTableComponent {
  @Input() limit = 0;
  @Input() dense = false;

  displayedColumns$: Observable<string[]> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(({ matches }) =>
        matches
          ? ['date', 'title', 'value']
          : ['date', 'origin', 'title', 'value']
      )
    );

  items$: Observable<Item[]> = this.auth.currentUser$.pipe(
    switchMap((user) =>
      this.itemService.getItems(user.uid, (ref) => this.buildQuery(ref))
    )
  );

  constructor(
    private itemService: ItemService,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  private buildQuery(ref: CollectionReference): Query {
    let query: Query = ref.orderBy('date', 'desc');
    if (this.limit) {
      query = query.limit(this.limit);
    }
    return query;
  }
}
