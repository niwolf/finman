import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector:    'fin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:   ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSmall$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
    map(result => result.matches)
  );

  today: Date = new Date();

  readonly activityLimit: number = 5;

  constructor(private breakpointObserver: BreakpointObserver) {}
}
