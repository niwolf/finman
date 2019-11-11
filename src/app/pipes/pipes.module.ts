import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDatePipe } from './firestore-date.pipe';



@NgModule({
  imports:      [
    CommonModule
  ],
  declarations: [
    FirestoreDatePipe
  ],
  exports:      [
    FirestoreDatePipe
  ]
})
export class PipesModule { }
