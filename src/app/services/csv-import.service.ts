import { Injectable } from '@angular/core';
import {
  Papa,
  ParseConfig,
  ParseResult
} from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  constructor(private papa: Papa) {}

  public import(file: File) {
    const config: ParseConfig = {
      complete: (results, f) => this.handleParseResult(results),
      // Add your options here
      worker: true
    };

    this.papa.parse(file, config);
  }

  private handleParseResult(result: ParseResult): void {
    console.log('Parsed: ', result);
  }
}
