import {
  Injectable,
  OnDestroy
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';
import {
  from,
  Observable,
  Subject
} from 'rxjs';
import {
  takeUntil,
  tap
} from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public currentUser: User;

  private destroy$: Subject<void> = new Subject();

  constructor(private auth: AngularFireAuth) {
    this.auth.user.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => this.currentUser = user);
  }

  public get user(): Observable<User>
  {
    return this.auth.user;
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap((credentials: UserCredential) => sessionStorage.setItem('user', JSON.stringify(credentials.user)))
    );
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      tap(() => sessionStorage.removeItem('user'))
    );
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
