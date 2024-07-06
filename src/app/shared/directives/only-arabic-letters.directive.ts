import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyArabicLetters]',
  standalone: true
})
export class OnlyArabicLettersDirective {

  private regex: RegExp = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]*$/;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return; // Allow special keys
    }

    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault(); // Prevent input if it doesn't match Arabic characters
    }
  }
}