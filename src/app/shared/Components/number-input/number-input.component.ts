import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css'
})
export class NumberInputComponent implements OnChanges{
  @Input() control!: FormControl;
  @Input() Label: string = '';
  @Input() placeholder: string = '';
  @Input() validation : any= {}
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
          case 'max':
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
