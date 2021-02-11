import { Component, HostBinding } from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { CsvImportService } from '@core/services/csv-import.service';

@Component({
  selector: 'fin-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  toggled = false;
  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    },
  ];

  @HostBinding('style.zIndex')
  get zIndex() {
    return this.toggled ? 1001 : null;
  }

  constructor(private importService: CsvImportService) {}

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  public import(files: FileList) {
    this.importService.import(files.item(0));
  }
}
