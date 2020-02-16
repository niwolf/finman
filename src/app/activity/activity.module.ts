import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import {
  MatIconModule,
  MatTableModule
} from '@angular/material';
import { PipesModule } from '../pipes/pipes.module';
import { ActivityTableComponent } from './activity-table.component';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MatTableModule,
    PipesModule,
    MatIconModule,
    DirectivesModule
  ],
  declarations: [
    ActivityTableComponent
  ],
  exports:      [
    ActivityTableComponent
  ]
})
export class ActivityModule {}
