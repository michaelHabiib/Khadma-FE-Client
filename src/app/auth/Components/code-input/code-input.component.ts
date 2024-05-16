import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../../../core/registration.service';
import { RegistrationCode } from '../../../core/interfaces/RegistrationCode';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifictionService } from '../../../shared/Services/notifiction.service';

@Component({
  selector: 'app-code-input',
  standalone: false,
  templateUrl: './code-input.component.html',
  styleUrl: './code-input.component.css',
})
export class CodeInputComponent {
  codeForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });
  constructor(
    private RegistrationService: RegistrationService,
    private dialogRef: MatDialogRef<CodeInputComponent>,
    private NotifictionService : NotifictionService,
  ) {}

  submit() {
    const modal: RegistrationCode = {
      code: this.codeForm.controls['code'].value!,
    };
    this.RegistrationService.sendCdoe(modal).subscribe({
      next: (res) => {
        if (!res.isUsed) {
          this.dialogRef.close();
        } else {
          this.NotifictionService.openSnackBar('al code msh nf3',)
        }
      },
    });
  }
}
