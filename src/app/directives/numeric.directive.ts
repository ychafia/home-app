import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numeric]'
})
export class NumericDirective {
  @Input('numericType') numericType: string; // number | decimal

  private regex = {
    number: "/^-?\d+$/",
    decimal: "/^-?[0-9]+(\.[0-9]*){0,1}$/g"
  };

  private specialKeys = {
    number: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
    decimal: [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ],
  };

  constructor(private el: ElementRef) { }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
      
      if (this.specialKeys[this.numericType].indexOf(event.key) !== -1) {
          return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(/\-?\d*\.?\d{1,2}/igm)) {
          event.preventDefault();
      }
  }
}
