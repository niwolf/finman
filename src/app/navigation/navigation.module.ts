import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../button/button.module';



@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports:      [
    NavigationComponent
  ],
  imports:      [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule
  ]
})
export class NavigationModule { }
