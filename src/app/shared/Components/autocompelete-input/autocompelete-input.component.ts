import { Component, Input, SimpleChanges } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, startWith, map } from 'rxjs';
import { NoSpacesDirective } from '../../directives/limit-spaces.directive';

@Component({
  selector: 'app-autocompelete-input',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    NoSpacesDirective
  ],
  templateUrl: './autocompelete-input.component.html',
  styleUrl: './autocompelete-input.component.css',
})
export class AutocompeleteInputComponent {
  @Input() control!: FormControl;
  @Input() options!: any[];
  @Input() filterProperties!: any;
  filteredOptions!: Observable<any[]>;
  placeholder: string = 'SELECT-ONE';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] || changes['filterProperties']) {
      this.options = changes['options'].currentValue;
      this.filteredOptions = this.control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    }
  }

displayFn(data: any): string {
  return data && data.accNO ? data.name : '';
}
private _filter(value: string): { enName: string; arName: string }[] {
  // Convert value to a string before calling toLowerCase()
  const filterValue = value ? value.toString().toLowerCase() : '';

  if (!filterValue) {
      return this.options; // Return original options when value is empty or not a string
  }

  const filteredOptions = this.options.filter((option) => {
      const prop1 = option[this.filterProperties.property_1];
      const prop2 = option[this.filterProperties.property_2];

      if (typeof prop1 === 'string' || typeof prop2 === 'string') {
          return (this.filterProperties.property_1 && prop1.toLowerCase().includes(filterValue)) ||
              (this.filterProperties.property_2 && prop2.toLowerCase().includes(filterValue));
      } else if (typeof prop1 === 'number' || typeof prop2 === 'number') {
          return (this.filterProperties.property_1 && prop1.toString().includes(filterValue)) ||
              (this.filterProperties.property_2 && prop2.toString().includes(filterValue));
      } else {
          return false; // Neither string nor number, so don't include in filtered options
      }
  });

  return filteredOptions; // Return filtered options
}


}
