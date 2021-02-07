import {
  Component,
  OnInit
} from '@angular/core';
import * as md5 from 'md5';
import firebase from 'firebase';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'fin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //@Input() set user(user: User) {
  //  this.userImg = user.photoURL || `https://secure.gravatar.com/avatar/${md5(user.email)}?d=mp`;
  //}

  userImg: string;

  constructor(public authService: AuthService) { }

  public hasProfilePic = false;

  public ngOnInit(): void
  {
  }

  public get userMail(): string
  {
    return this.authService.currentUser.email;
  }

  public get userPic(): any {
    return this.userImg = this.authService.currentUser.photoURL || `https://secure.gravatar.com/avatar/${md5(this.authService.currentUser.email)}?d=mp`;
  }
}
