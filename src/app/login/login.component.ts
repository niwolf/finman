import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector:    'fin-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss']
})
export class LoginComponent
{
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  form: FormGroup = new FormGroup({
    email:    this.email,
    password: this.password
  });

  pending = false;
  hide = true;

  constructor(private auth: AngularFireAuth,
              private snackBar: MatSnackBar)
  {}

  public onSubmit() {
    if (this.form.valid) {
      this.login(this.form.value.email, this.form.value.password);
    }
  }

  private login(email: string, password: string)
  {
    this.pending = true;
    this.auth.auth.signInWithEmailAndPassword(email, password)
        .then((credential: UserCredential) =>
        {
          console.log(credential);
          this.snackBar.dismiss();
        })
        .catch((err: any) =>
        {
          console.error(err);
          const message: string = this.extractAuthErrorMessage(err);
          this.snackBar.open(message, 'dismiss');
        })
        .finally(() => this.pending = false);
  }

  private extractAuthErrorMessage(err: { code: string, message: string }): string
  {
    switch (err.code) {
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/wrong-password':
      case 'auth/invalid-email':
      default:
        return err.message;
    }
  }

}
