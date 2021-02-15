import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fin-activity',
  templateUrl: './activity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {}
