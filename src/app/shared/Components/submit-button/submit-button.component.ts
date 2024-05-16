import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [],
  template: `<button class='btn btn-success ms-auto me-2' (click)="onClick()">Submit</button>`,
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
