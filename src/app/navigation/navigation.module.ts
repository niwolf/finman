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



@NgModule({
  declarations: [
    NavigationComponent
  ],
  exports:      [
    NavigationComponent
  ],
  imports:      [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class NavigationModule { }
