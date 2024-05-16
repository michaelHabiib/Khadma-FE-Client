import { ComponentType } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [MatDialogModule,NgIf],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class ActionsComponent implements OnChanges {
  @Input() componentForm!: ComponentType<any>;
  @Input() row: any;
  @Input() isTableRowsDeletable!:  boolean;
  @Input() isTableRowsEditable!:  boolean;
  @Output() DeleteRow = new EventEmitter<{ action: string, id: number }>();
  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['isTableRowsEditable']) {
      // Do something when isTableRowsEditable changes
      this.isTableRowsEditable = changes['isTableRowsEditable'].currentValue
    }
    if (changes['isTableRowsDeletable']) {
      // Do something when isTableRowsDeletable changes
      this.isTableRowsDeletable = changes['isTableRowsDeletable'].currentValue
      
    }
  }
  editrow(data : any) {
    console.log(data);
    this.dialog.open(this.componentForm, {
      data : data,
      panelClass: ['animate__animated', 'animate__flipInX'],
    });
  }
  deleteRow(row : any) {
    console.log(row);
    this.DeleteRow.emit(row);
  }

}
