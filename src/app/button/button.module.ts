import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import {
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
