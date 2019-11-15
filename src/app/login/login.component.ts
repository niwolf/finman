import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector:    'fin-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss']
})
export class LoginComponent implements OnInit
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
              private router: Router,
              private snackBar: MatSnackBar)
  {}

  public ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if (user) { this.router.navigate(['/dashboard']); }
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this.login(this.form.value.email, this.form.value.password);
    }
  }

  private login(email: string, password: string)
  {
    this.pending = true;
    this.auth.auth.signInWithEmailAndPassword(email, password)
        .then(() =>
        {
          this.snackBar.dismiss();
          this.router.navigate(['/dashboard']);
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
