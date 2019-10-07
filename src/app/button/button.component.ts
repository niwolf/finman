import { Component } from '@angular/core';

@Component({
  selector: 'fin-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  toggled = false;

  public toggle(): void
  {
    this.toggled = !this.toggled;
  }
}
