import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: {seconds: number, nanoseconds: number}, ...args: any[]): any {
    return new Date(value.seconds);
  }

}
