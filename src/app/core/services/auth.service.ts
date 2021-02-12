import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, Subject } from 'rxjs';
import { shareReplay, startWith, takeUntil, tap } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;
import { isUser } from '@common/rxjs-operators/is-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  /**
   * A stream that holds the current user.
   * !CAUTION: It might emit valid UserInfo before the user is properly logged in, since it tries to read it from localStorage.
   * If UserInfo is not available in localStorage, undefined will be emitted as first value.
   *
   * NOTE: Its single purpose is to show the dashboard already before the user is properly logged in.
   */
  public user$!: Observable<User | null | undefined>;
  /** The currently logged in user. As long as the user is not logged in properly, this stream will not have any value. */
  public currentUser$: Observable<User> = this.auth.user.pipe(
    isUser,
    shareReplay()
  );
  /** The currently logged in user. Undefined until the user is properly logged in. */
  public currentUser: User | undefined = undefined;

  private destroy$: Subject<void> = new Subject();

  constructor(private auth: AngularFireAuth) {
    const userFromLocalStorage: string | null = localStorage.getItem('user');
    const currentUser: User | undefined = userFromLocalStorage
      ? JSON.parse(userFromLocalStorage)
      : undefined;
    this.user$ = this.currentUser$.pipe(startWith(currentUser));
    this.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.currentUser = user));
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap((credentials: UserCredential) =>
        localStorage.setItem('user', JSON.stringify(credentials.user))
      )
    );
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut()).pipe(
      tap(() => localStorage.removeItem('user'))
    );
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
