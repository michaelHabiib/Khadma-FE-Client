import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyEnglishLetters]',
  standalone: true
})
export class OnlyEnglishLettersDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const inputValue = this.el.nativeElement.value;
    // Regular expression to match non-English characters
    const nonEnglishRegex = /[^a-zA-Z0-9\s]/g;
    // Replace all non-English characters with an empty string
    this.el.nativeElement.value = inputValue.replace(nonEnglishRegex, '');
    // Prevent event propagation if non-English characters are detected
    if (nonEnglishRegex.test(inputValue)) {
      event.preventDefault();
    }
  }

}
