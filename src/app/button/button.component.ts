import {
  AfterViewInit,
  Component
} from '@angular/core';

import * as Papa from 'papaparse';

@Component({
  selector:    'fin-button',
  templateUrl: './button.component.html',
  styleUrls:   ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  toggled = false;
  file: File;
  private backdrop: HTMLDivElement;
  private readonly backdropId: string = 'button-backdrop';

  public ngAfterViewInit(): void {
    const backdropElement: HTMLDivElement = document.getElementById(this.backdropId) as HTMLDivElement;
    if (backdropElement) {
      this.backdrop = backdropElement;
    } else {
      this.backdrop = this.createBackdropElement();
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
    this.backdrop.style.visibility = this.toggled ? 'visible' : 'hidden';
  }

  private createBackdropElement(): HTMLDivElement {
    const backdrop: HTMLDivElement = document.createElement('div');
    backdrop.classList.value = 'mat-drawer-backdrop mat-drawer-shown';
    backdrop.style.visibility = 'hidden';
    backdrop.onclick = (): void => this.toggle();
    backdrop.id = this.backdropId;
    document.body.insertAdjacentElement('beforeend', backdrop);
    return backdrop;
  }

  public import(files: FileList)
  {
    console.log(files);
    const file: File = files.item(0);
    const parsed: any = Papa.parse(file);
    console.log(parsed);
  }
}
