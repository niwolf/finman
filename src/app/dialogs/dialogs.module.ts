import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { InitialBudgetDialogComponent } from './initial-budget-dialog/initial-budget-dialog.component';
import { ImportPreviewDialogComponent } from './import-preview-dialog/import-preview-dialog.component';
import { FinCommonModule } from '@common/common.module';
import { MatTableExtensionsModule } from 'angular-material-extensions';

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
    MatTableExtensionsModule,
  ],
  declarations: [InitialBudgetDialogComponent, ImportPreviewDialogComponent],
  exports: [InitialBudgetDialogComponent, ImportPreviewDialogComponent],
  entryComponents: [InitialBudgetDialogComponent, ImportPreviewDialogComponent],
})
export class DialogsModule {}
