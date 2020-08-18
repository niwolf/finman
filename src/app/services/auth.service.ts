import {
  Injectable,
  OnDestroy
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  takeUntil,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public currentUser: User;

  private destroy$: Subject<void> = new Subject();

  constructor(private auth: AngularFireAuth) {
    this.auth.user.pipe(
      takeUntil(this.destroy$),
    ).subscribe(user => this.currentUser = user);
  }

  public get user(): Observable<User>
  {
    return this.auth.user;
  }

  public signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.auth.signOut();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
