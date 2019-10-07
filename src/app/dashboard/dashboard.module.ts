import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatListModule } from '@angular/material';
import { TimestampToDatePipe } from './timestamp-to-date.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    TimestampToDatePipe
  ],
  imports:      [
    CommonModule,
    DashboardRoutingModule,
    MatListModule
  ]
})
export class DashboardModule { }
