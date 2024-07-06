import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
})
export class SelectInputComponent implements OnChanges {
  @Input() control!: FormControl;
  @Input() Label: string = '';
  @Input() placeholder: string = '';
  @Input() options!: any[];
  @Input() nameProperty = '';
  @Input() viewProperty = 'id';
  @Input() validation: any = {};
  @Input() isReadOnly: boolean = false;
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
          default:
            break;
        }
      }
    }
    this.control.updateValueAndValidity();
    if (changes['isReadOnly']) {
      if (this.isReadOnly) {
        this.control.disable();
      }
    }
  }
}
