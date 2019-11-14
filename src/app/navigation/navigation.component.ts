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
import { AngularFireAuth } from '@angular/fire/auth';
import * as md5 from 'md5';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector:    'fin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls:   ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
    map(result => result.matches),
    shareReplay()
  );


  userImg: string = this.auth.auth.currentUser.photoURL ||
                    `https://secure.gravatar.com/avatar/${md5(this.auth.auth.currentUser.email)}?d=mp`;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AngularFireAuth,
    private route: ActivatedRoute
  ) {}

  public get isDashboard(): boolean
  {
    return this.route.firstChild.component === DashboardComponent;
  }

  public signOut(): void {
    this.auth.auth.signOut();
  }
}
