import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FinCommonModule } from '@common/common.module';
import { ActivityTableComponent } from './activity-table.component';


@NgModule({
  imports: [
    CommonModule,
    FinCommonModule,
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
export class ActivityTableModule
{}
