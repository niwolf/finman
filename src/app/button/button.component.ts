import {
  AfterViewInit,
  Component
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector:    'fin-button',
  templateUrl: './button.component.html',
  styleUrls:   ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  toggled = false;

  private readonly backdrop: HTMLDivElement = document.createElement('div');
  private readonly backdropId: string = 'button-backdrop';

  public ngAfterViewInit(): void {
    const backdropElement: HTMLDivElement = document.getElementById(this.backdropId) as HTMLDivElement;
    if (isNullOrUndefined(backdropElement)) {
      this.insertBackdropElement();
    }
  }

  public toggle(): void {
    this.toggled = !this.toggled;
    this.backdrop.style.visibility = this.toggled ? 'visible' : 'hidden';
  }

  private insertBackdropElement(): void {
    this.backdrop.classList.value = 'mat-drawer-backdrop mat-drawer-shown';
    this.backdrop.style.visibility = 'hidden';
    this.backdrop.onclick = (): void => this.toggle();
    this.backdrop.id = this.backdropId;
    document.body.insertAdjacentElement('beforeend', this.backdrop);
  }
}
