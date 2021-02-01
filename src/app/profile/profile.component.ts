import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public hasProfilePic = false;

  public ngOnInit(): void
  {
  }

  public get user(): string
  {
    return this.authService.currentUser.email;
  }
}
