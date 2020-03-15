import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectionColumnComponent } from './components/mat-selection-column/mat-selection-column.component';
import {
  MatCheckboxModule,
  MatTableModule
} from '@angular/material';



@NgModule({
  declarations: [MatSelectionColumnComponent],
  exports:      [
    MatSelectionColumnComponent
  ],
  imports:      [
    CommonModule,
    MatCheckboxModule,
    MatTableModule
  ]
})
export class FinCommonModule { }
