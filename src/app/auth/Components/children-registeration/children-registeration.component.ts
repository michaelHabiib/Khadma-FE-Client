import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CodeInputComponent } from '../code-input/code-input.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../../../core/registration.service';
import { NotifictionService } from '../../../shared/Services/notifiction.service';

@Component({
  selector: 'app-children-registeration',
  standalone: false,
  templateUrl: './children-registeration.component.html',
  styleUrl: './children-registeration.component.css',
})
export class ChildrenRegisterationComponent implements OnInit {
  registrationForm = new FormGroup({
    code: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    BuildingNumber: new FormControl('', Validators.required),
    subStreet: new FormControl(''),
    street: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    flatNo: new FormControl(0, Validators.required),
    Descrption: new FormControl(''),
    whatsAppNo: new FormControl(0),
    fatherPhone: new FormControl(''),
    motherPhone: new FormControl(''),
    birthday: new FormControl(Date),
    gender: new FormControl('', Validators.required),
    NationalId: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
    ]),
    fatherMail: new FormControl('', Validators.email),
    motherMail: new FormControl('', Validators.email),
  });
  levels: { id: string; name: string }[] = [
    { id: 'bc', name: 'Baby Class' },
    { id: 'kg1', name: 'KG 1' },
    { id: 'kg2', name: 'KG 2' },
    { id: 'prim1', name: 'Prim 1' },
  ];
  genders : {id : string, name : string}[]= [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },

  ]
  classes : any []= []
  constructor(
    private dialog: MatDialog,
    private RegistrationService: RegistrationService,
    private NotifictionService: NotifictionService
  ) {}

  ngOnInit(): void {

    this.openCOdeInputDialog();
    this.registrationForm.get('level')?.valueChanges.subscribe((value) => {
      this.getAllClasses(value!);
    });
  }
  openCOdeInputDialog() {
    this.dialog.open(CodeInputComponent, {
      disableClose: true, // Prevents closing the dialog by clicking outside or pressing escape key
    });
  }
  getAllClasses(level: string) {
    this.RegistrationService.getClassesByLevel(level).subscribe({
      next: (res) => {
        this.classes = res;
      },
      error: (err) => {
        this.NotifictionService.openSnackBar('Failed to Get Data')
      },
    });
  }
  submit(){
    const modal =  this.registrationForm.value
    this.RegistrationService.studentRegister(modal).subscribe({
      next : (res) => {
        this.NotifictionService.openSnackBar('Inserted Successfully')
      },
      error : (err) => {
        this.NotifictionService.openSnackBar('Failed to Insert Data')
      }
    })
  }
}
