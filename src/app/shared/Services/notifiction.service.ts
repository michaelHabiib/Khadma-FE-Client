import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifictionService {
  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    // let config : MatSnackBarConfig = {
    //   duration: 2000, // Duration in milliseconds
    //   horizontalPosition: 'end', // Positioning
    //   verticalPosition: 'top',
    //   panelClass: panelClass // Custom CSS class
    //   // Other configurations as needed
    // };;
    // let action

    this.snackBar.open(message);
  }

}
