import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDatePipe, UserImgPipe } from './pipes';
import { ColorDirective } from './directives';

@NgModule({
  imports: [CommonModule],
  declarations: [FirestoreDatePipe, ColorDirective, UserImgPipe],
  exports: [FirestoreDatePipe, ColorDirective, UserImgPipe],
})
export class FinCommonModule {}
