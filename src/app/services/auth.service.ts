import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}

  public get user(): Observable<User>
  {
    return this.auth.user;
  }

  public get currentUser(): User {
    return this.auth.auth.currentUser;
  }

  public signIn(email: string, password: string): Promise<UserCredential> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut(): Promise<void> {
    return this.auth.auth.signOut();
  }
}
