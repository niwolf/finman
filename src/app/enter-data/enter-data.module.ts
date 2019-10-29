import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatCardModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EnterDataComponent } from './enter-data.component';


@NgModule({
  declarations: [
    EnterDataComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  exports:      [EnterDataComponent]
})
export class EnterDataModule {}
