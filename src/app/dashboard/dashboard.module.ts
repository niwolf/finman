import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class DashboardModule { }
