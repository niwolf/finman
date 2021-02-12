import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, Subject } from 'rxjs';
import { shareReplay, startWith, takeUntil, tap } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  public currentUser!: User | null | undefined;
  public user: Observable<User | null | undefined> = this.auth.user.pipe(
    startWith(this.currentUser),
    shareReplay()
  );

  private destroy$: Subject<void> = new Subject();

  constructor(private auth: AngularFireAuth) {
    const userFromLocalStorage: string | null = localStorage.getItem('user');
    this.currentUser = userFromLocalStorage
      ? JSON.parse(userFromLocalStorage)
      : undefined;
    this.auth.user
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
