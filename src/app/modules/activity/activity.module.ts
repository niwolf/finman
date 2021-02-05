import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivityTableComponent } from './activity-table.component';
import { FinCommonModule } from '@common/common.module';


@NgModule({
  imports: [
    CommonModule,
    FinCommonModule,
    ActivityRoutingModule,
    MatTableModule,
    MatIconModule
  ],
  declarations: [
    ActivityTableComponent
  ],
  exports:      [
    ActivityTableComponent
  ]
})
export class ActivityModule {}
