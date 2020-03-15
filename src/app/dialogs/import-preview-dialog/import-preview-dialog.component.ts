import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { Item } from '../../models/item.interface';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'fin-import-preview-dialog',
  templateUrl: './import-preview-dialog.component.html',
  styleUrls: ['./import-preview-dialog.component.scss']
})
export class ImportPreviewDialogComponent {

  readonly columns = ['select', 'index', 'date', 'value', 'title'];

  selection = new SelectionModel<Item>(true, this.data);

  constructor(private dialogRef: MatDialogRef<ImportPreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Item[]) {}

  public close(): void {
    this.dialogRef.close();
  }
}
