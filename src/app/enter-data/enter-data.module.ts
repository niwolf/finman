import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EnterDataComponent } from './enter-data.component';
import { MatNativeDateModule } from '@angular/material/core';


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
    MatIconModule
  ],
  exports:      [EnterDataComponent]
})
export class EnterDataModule {}
