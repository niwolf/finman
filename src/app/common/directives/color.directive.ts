import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[finColor]',
})
export class ColorDirective implements OnChanges {
  @Input('finColor')
  public condition: boolean;

  constructor(private elementRef: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.style.color = this.condition
      ? 'green'
      : 'red';
  }
}
