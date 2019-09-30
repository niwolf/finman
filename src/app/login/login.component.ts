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
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector:    'fin-login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  public form: FormGroup = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public pending = false;

  constructor(private auth: AngularFireAuth,
              private snackBar: MatSnackBar)
  {
  }

  ngOnInit()
  {
  }

  public onSubmit()
  {
    if(this.form.valid)
    {
      this.login(this.form.value.email, this.form.value.password);
    }
  }

  private login(email: string, password: string)
  {
    this.pending = true;
    this.auth.auth.signInWithEmailAndPassword(email, password)
        .then((credential: UserCredential) => console.log(credential))
        .catch((err: any) =>
        {
          console.error(err);
          this.snackBar.open('Login failed', 'dismiss', {duration: 1000});
        })
        .finally(() => this.pending = false);
  }

}
