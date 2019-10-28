import {
  AfterViewInit,
  Component
} from '@angular/core';

@Component({
  selector:    'fin-button',
  templateUrl: './button.component.html',
  styleUrls:   ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit {
  toggled = false;

  private readonly backdrop: HTMLDivElement = document.createElement('div');

  public ngAfterViewInit(): void {
    this.insertBackdropElement();
  }

  public toggle(): void {
    this.toggled = !this.toggled;
    this.backdrop.style.visibility = this.toggled ? 'visible' : 'hidden';
  }

  private insertBackdropElement(): void {
    this.backdrop.classList.value = 'mat-drawer-backdrop mat-drawer-shown';
    this.backdrop.style.visibility = 'hidden';
    this.backdrop.onclick = (): void => this.toggle();
    document.body.insertAdjacentElement('beforeend', this.backdrop);
  }
}
