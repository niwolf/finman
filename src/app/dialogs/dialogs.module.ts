import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule
} from '@angular/material';

import { InitialBudgetDialogComponent } from './initial-budget-dialog/initial-budget-dialog.component';
import { ImportPreviewDialogComponent } from './import-preview-dialog/import-preview-dialog.component';
import { FinCommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    FinCommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
  ],
  declarations: [
    InitialBudgetDialogComponent,
    ImportPreviewDialogComponent
  ],
  exports: [
    InitialBudgetDialogComponent,
    ImportPreviewDialogComponent
  ],
  entryComponents: [
    InitialBudgetDialogComponent,
    ImportPreviewDialogComponent
  ]
})
export class DialogsModule { }
