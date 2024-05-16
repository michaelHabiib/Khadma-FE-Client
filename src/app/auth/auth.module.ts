import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenRegisterationComponent } from './Components/children-registeration/children-registeration.component';
import { MaterialModule } from '../material/material.module';
import { CodeInputComponent } from './Components/code-input/code-input.component';
import { SharedModule } from '../shared/shared.module';
import { TextInputComponent } from '../shared/Components/text-input/text-input.component';
import { SelectInputComponent } from '../shared/Components/select-input/select-input.component';
import { NumberInputComponent } from '../shared/Components/number-input/number-input.component';
import { EmailInputComponent } from '../shared/Components/email-input/email-input.component';
import { DateInputComponent } from '../shared/Components/date-input/date-input.component';
import { DescrptionInputComponent } from '../shared/Components/descrption-input/descrption-input.component';
import { SubmitButtonComponent } from '../shared/Components/submit-button/submit-button.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../shared/Components/header/header.component';
const routes: Routes = [
  {
    path: 'login',
    component  :ChildrenRegisterationComponent,

  },

];
@NgModule({
  declarations: [
    ChildrenRegisterationComponent,
    CodeInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    TextInputComponent,
    SelectInputComponent,
    NumberInputComponent,
    EmailInputComponent,
    DateInputComponent,
    DescrptionInputComponent,
    SubmitButtonComponent,
    HeaderComponent
  ]
})
export class AuthModule { }
