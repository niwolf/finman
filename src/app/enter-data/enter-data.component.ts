import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector:    'fin-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls:   ['./enter-data.component.scss']
})
export class EnterDataComponent {
  dataForm = new FormGroup({
    amount:     new FormControl(''),
    persOrComp: new FormControl(''),
    titel:      new FormControl(''),
  });

  onSubmit() {
    alert(this.dataForm.value);
  }

}
