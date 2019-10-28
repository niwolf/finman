import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  merge,
  Observable,
  of
} from 'rxjs';
import { User } from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector:    'fin-app',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User> = merge(of(undefined), this.auth.user);

  constructor(public auth: AngularFireAuth, private route: ActivatedRoute) {}

  public get isDashboard(): boolean
  {
    return this.route.firstChild.component === DashboardComponent;
  }
}
