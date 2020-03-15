import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatTable
} from '@angular/material';

@Component({
  selector: 'fin-mat-selection-column',
  templateUrl: './mat-selection-column.component.html',
  styleUrls: ['./mat-selection-column.component.scss']
})
export class MatSelectionColumnComponent<T> implements OnInit, OnDestroy {

  @Input()
  public name: string;

  @Input()
  public selection: SelectionModel<T>;

  @ViewChild(MatColumnDef, {static: true})
  private columnDef: MatColumnDef;
  @ViewChild(MatCellDef, {static: true})
  private cell: MatCellDef;
  @ViewChild(MatHeaderCellDef, {static: true})
  private headerCell: MatHeaderCellDef;

  constructor(private table: MatTable<T>) { }

  public ngOnInit(): void {
    this.columnDef.name = this.name;
    this.columnDef.cell = this.cell;
    this.columnDef.headerCell = this.headerCell;
    this.table.addColumnDef(this.columnDef);
  }

  public ngOnDestroy(): void {
    this.table.removeColumnDef(this.columnDef);
  }

  private get data(): T[] {
    return this.table.dataSource as T[];
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection ? this.selection.selected.length : 0;
    const numRows = this.data ? this.data.length : 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

}
