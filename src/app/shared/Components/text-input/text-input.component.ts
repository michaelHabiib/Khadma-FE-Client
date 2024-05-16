import {
  Component,
  Directive,
  DirectiveDecorator,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    JsonPipe,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent implements OnChanges {
  @Input() control!: FormControl;
  @Input() Label: string = '';
  @Input() Placeholder: string = '';
  @Input() validation: any = {};
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validation']) {
      // const validators: any[] = [];
      for (const key of Object.keys(this.validation)) {
        const value = this.validation[key];
        switch (key) {
          case 'required':
            if (value === true) {
              this.control.addValidators([Validators.required]);
              // validators.push(this.validateRequired);
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
