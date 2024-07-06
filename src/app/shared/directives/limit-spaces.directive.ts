import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLimitSpaces]',
  standalone: true
})
export class NoSpacesDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value;

    // Replace consecutive spaces with a single space
    value = value.replace(/\s\s+/g, ' ');

    // Update input value without consecutive spaces
    this.renderer.setProperty(inputElement, 'value', value);
  }
}