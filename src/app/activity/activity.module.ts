import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { MatTableModule } from '@angular/material';
import { PipesModule } from '../pipes/pipes.module';
import { ActivityTableComponent } from './activity-table.component';


@NgModule({
  imports:      [
    CommonModule,
    ActivityRoutingModule,
    MatTableModule,
    PipesModule
  ],
  declarations: [
    ActivityTableComponent
  ],
  exports:      [
    ActivityTableComponent
  ]
})
export class ActivityModule {}
