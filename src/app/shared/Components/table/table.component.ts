import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgIf, TitleCasePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Column } from '../../../core/interfaces/Coulmn';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgClass } from '@angular/common';
import { NgTemplateOutlet } from '@angular/common';
import { ActionsComponent } from '../actions/actions.component';
import { ComponentType } from '@angular/cdk/portal';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { Route, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
interface TableData<T> {
  [key: string]: T;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    TitleCasePipe,
    MatInputModule,
    NgIf,
    MatIconModule,
    MatMenuModule,
    NgClass,
    NgTemplateOutlet,
    ActionsComponent,
    DatePipe,
    DecimalPipe,
    RouterModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('scaleOnHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.1)' })),
      transition('normal <=> hovered', animate('200ms ease-in-out')),
    ]),
  ],
})
export class TableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @Input() tableData: TableData<T>[] = [];
  @Input() tableColumns: Column[] = [];
  @Input() componentForm!: ComponentType<any>;
  @Input() spareComponent!: ComponentType<any>;
  @Input() headerBackgroundColor: string = 'lightblue';
  @Input() headerTextColor: string = 'black';
  @Input() isTableRowsEditable: boolean = false;
  @Input() isTableRowsDeletable: boolean = false;
  @Input() isTablePaginatable!: boolean;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  isArabic: boolean = false;
  dataSource: MatTableDataSource<TableData<T>>;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: Array<string> = [];
  @Output() deleteRow = new EventEmitter<{ action: string; id: number }>();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
  pageSize: number = 5;
  pageIndex: number = 0;
  totalLength: any = 0;
  constructor(
    private dir: Directionality,
    private router: Router,
    private dialog : MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.tableData);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData']) {
      // Do something when tableData changes
      if (this.tableData) {
        this.tableData.forEach((row: any, index: number) => {
          this.dataSource.sort = this.matSort;
          row.postion = index + 1;
        });
      }
      this.dataSource = new MatTableDataSource(this.tableData);
      if (this.dataSource.data.length) {
        this.totalLength = this.dataSource.data[0]['countOfRows'];
      }
    }
    if (changes['tableColumns']) {
      this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    }
    if (changes['headerBackgroundColor']) {
      // Do something when headerBackgroundColor changes
    }
    if (changes['headerTextColor']) {
      // Do something when headerTextColor changes
    }
    if (changes['isTableRowsEditable']) {
      // Do something when isTableRowsEditable changes
      this.isTableRowsEditable = changes['isTableRowsEditable'].currentValue;
    }
    if (changes['isTableRowsDeletable']) {
      // Do something when isTableRowsDeletable changes
      this.isTableRowsDeletable = changes['isTableRowsDeletable'].currentValue;
    }
    if (changes['isTablePaginatable']) {
      // Do something when isTableRowsDeletable changes
      this.isTablePaginatable = changes['isTablePaginatable'].currentValue;
    }
  }
  ngOnInit() {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length) {
      this.totalLength = this.dataSource.data[0]['countOfRows'];
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  DeleteRowFromChild(eventData: { action: string; id: number }) {
    this.deleteRow.emit(eventData);
  }
  onRowClick($event: PageEvent) {
    $event.pageIndex++;
    this.rowClicked.emit($event);
  }
  navigate(column: Column, element: any) {
    if (column.isRoute && column.routePath && element[column.columnDef]) {
      // Assuming the column definition holds the property to navigate with
      const id = element[column.columnDef]; // Adjust this based on your data structure
      this.router.navigate([column.routePath, id]);
    }
  }
  openDialog(element : any) {
    this.dialog.open(this.spareComponent, {
      data : element,
      panelClass: ['animate__animated', 'animate__flipInX'],
    });
  }

}
