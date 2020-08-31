import {
  Directive,
  Host,
  HostListener,
  OnInit
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[finTooltipShow]'
})
export class TooltipShowDirective implements OnInit {

  constructor(@Host() private tooltipDir: MatTooltip) {}

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseout', ['$event'])
  public stopPropagation(event: MouseEvent) {
    event.stopImmediatePropagation();
  }

  public ngOnInit()
  {
    setTimeout(() => this.tooltipDir.show());
  }
}
