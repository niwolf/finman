import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import {
  MatDatepickerModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';
import { PipesModule } from '../pipes/pipes.module';
import { ActivityTableComponent } from './activity-table.component';
import { MatInputModule } from '@angular/material/typings/input';
import { ReactiveFormsModule } from '@angular/forms';


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
