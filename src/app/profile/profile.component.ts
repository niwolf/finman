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

  public ngOnInit(): void
  {
  }

  public get user(): any
  {
    return this.authService.currentUser.email;
  }

}
