import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'fin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  user$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}
}
