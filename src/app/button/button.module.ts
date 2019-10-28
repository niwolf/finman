import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports:      [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports:      [ButtonComponent]
})
export class ButtonModule { }
