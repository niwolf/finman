import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports:      [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:      [ButtonComponent]
})
export class ButtonModule { }
