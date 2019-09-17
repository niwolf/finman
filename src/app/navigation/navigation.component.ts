import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay
} from 'rxjs/operators';

@Component({
  selector:    'fin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls:   ['./navigation.component.scss']
})
export class NavigationComponent
{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver)
  {
  }

}
