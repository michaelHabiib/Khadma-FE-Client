import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
})
export class DateInputComponent implements OnChanges {
  @Input() control!: FormControl;
  @Input() Label: string = '';
  @Input() placeholder: string = '';
  @Input() validation: any = {};
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  ngOnChanges(changes: SimpleChanges): void {
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
