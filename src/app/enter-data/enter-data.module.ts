import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EnterDataComponent } from './enter-data.component';


@NgModule({
  declarations: [
    EnterDataComponent
  ],
  imports:      [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:      [EnterDataComponent]
})
export class EnterDataModule {}
