import { NgIf, JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-email-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    JsonPipe,
  ],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.css',
})
export class EmailInputComponent implements OnChanges {
  @Input() control!: FormControl;
  @Input() Label: string = '';
  @Input() Placeholder: string = '';
  @Input() validation: any = {};
  ngOnChanges(changes: SimpleChanges): void {
    this.control.addValidators([
      Validators.email,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]);

    if (changes['validation']) {
      for (const key of Object.keys(this.validation)) {
        const value = this.validation[key];
        switch (key) {
          case 'required':
            if (value === true) {
              this.control.addValidators([Validators.required]);
            }
            break;
          case 'minLength':
            if (typeof value === 'number') {
              this.control.addValidators([Validators.minLength(value)]);
            }
            break;
          case 'maxLength':
            if (typeof value === 'number') {
              this.control.addValidators([Validators.maxLength(value)]);
            }
            break;
          default:
            break;
        }
      }
    }
    this.control.updateValueAndValidity();
  }
}
