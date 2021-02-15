import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';

import { ButtonComponent } from './button.component';
import { TooltipShowDirective } from './tooltip-show.directive';

@NgModule({
  declarations: [ButtonComponent, TooltipShowDirective],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    OverlayModule,
  ],
  exports: [ButtonComponent],
})
export class ButtonModule {}
