import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import UserCredential = firebase.auth.UserCredential;
import { AuthService } from '../services/auth.service';

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

  constructor(private auth: AuthService, private snackBar: MatSnackBar) {}

  public onSubmit() {
    if (this.form.valid) {
      this.login(this.form.value.email, this.form.value.password);
    }
  }

  private login(email: string, password: string)
  {
    this.pending = true;
    this.auth.signIn(email, password)
        .then((credential: UserCredential) =>
        {
          console.log(credential);
          this.snackBar.dismiss();
        })
        .catch((err: any) =>
        {
          console.error(err);
          const message: string = this.extractAuthErrorMessage(err);
          this.snackBar.open(message, 'OK');
        })
        .finally(() => this.pending = false);
  }

  private extractAuthErrorMessage(err: { code: string, message: string }): string
  {
    switch (err.code) {
      case 'auth/user-not-found':
        return 'Nutzer nicht gefunden. Bitte überprüfen sie ihre E-Mail';
      case 'auth/wrong-password':
        return 'Falsches Passwort';
      case 'auth/invalid-email':
        return 'Ungültige E-Mail';
      default:
        return err.message;
    }
  }

}
