import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() title = '';
  @Input() backgroundColor = '';
  @Input() textColor = '';
  underlineHeight: number = 3;

  // increaseUnderline() {
  //   this.underlineHeight = 100; // increase the underline height to 6px on mouseenter
  // }

  // decreaseUnderline() {
  //   this.underlineHeight = 3; // decrease the underline height back to 3px on mouseleave
  // }
}
