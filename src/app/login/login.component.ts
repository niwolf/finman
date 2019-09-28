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

  constructor(private auth: AngularFireAuth)
  {
  }

  ngOnInit()
  {
  }

  public login(value: { email: string, password: string })
  {
    this.auth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then((credential: UserCredential) => console.log(credential))
        .catch((err: any) => console.error(err));
  }
}
