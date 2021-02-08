import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ActivityTableModule } from '@shared/activity-table';
import { BalanceComponent } from './tiles/balance/balance.component';
import { StatsComponent } from './tiles/stats/stats.component';
import { CurrentMonthComponent } from './tiles/current-month/current-month.component';
import { FinCommonModule } from '@common/common.module';


@NgModule({
  declarations: [
    DashboardComponent,
    BalanceComponent,
    StatsComponent,
    CurrentMonthComponent
  ],
  imports: [
    CommonModule,
    FinCommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ActivityTableModule
  ]
})
export class DashboardModule { }
