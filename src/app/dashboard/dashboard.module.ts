import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { FirestoreDatePipe } from './firestore-date.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    FirestoreDatePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule
  ]
})
export class DashboardModule { }
