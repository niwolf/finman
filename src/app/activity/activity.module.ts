import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';

import { ActivityRoutingModule } from './activity-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { ActivityTableComponent } from './activity-table.component';


@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MatTableModule,
    PipesModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    ActivityTableComponent
  ],
  exports:      [
    ActivityTableComponent
  ]
})
export class ActivityModule {}
