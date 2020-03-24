import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDatePipe } from './pipes';
import { ColorDirective } from './directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FirestoreDatePipe,
    ColorDirective
  ],
  exports: [
    FirestoreDatePipe,
    ColorDirective
  ]
})
export class FinCommonModule { }
