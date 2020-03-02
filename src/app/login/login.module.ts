import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
