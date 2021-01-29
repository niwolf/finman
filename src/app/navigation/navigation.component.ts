import {
  Component,
  Input
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay
} from 'rxjs/operators';
import * as md5 from 'md5';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector:    'fin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls:   ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input() set user(user: User) {
    this.userImg = user.photoURL || `https://secure.gravatar.com/avatar/${md5(user.email)}?d=mp`;
  }

  userImg: string;

  isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router
  ) {}

  public signOut(): void {
    this.auth.signOut().subscribe();
  }

  public routeToProfile(): void {
    this.router.navigateByUrl('/profile');
  }
}
