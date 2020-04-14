import {
  Component,
  Inject
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector:    'fin-initial-budget-dialog',
  templateUrl: './initial-budget-dialog.component.html',
  styleUrls:   ['./initial-budget-dialog.component.scss']
})
export class InitialBudgetDialogComponent {
  public form: FormGroup = new FormGroup({
    cash: new FormControl('', Validators.required),
    account: new FormControl('', Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<InitialBudgetDialogComponent>) { }

  public close(): void
  {
    this.dialogRef.close();
  }
}
