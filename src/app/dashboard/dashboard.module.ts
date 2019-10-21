import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    DashboardComponent,
    FirestoreDatePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatSortModule,
  ]
})
export class DashboardModule { }
