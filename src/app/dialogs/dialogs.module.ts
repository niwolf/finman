import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { InitialBudgetDialogComponent } from './initial-budget-dialog/initial-budget-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    InitialBudgetDialogComponent
  ],
  exports: [
    InitialBudgetDialogComponent
  ],
  entryComponents: [
    InitialBudgetDialogComponent
  ]
})
export class DialogsModule { }
