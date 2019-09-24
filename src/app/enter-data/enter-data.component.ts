import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EnterDataInterface } from '../enter-data.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss']
})
export class EnterDataComponent implements OnInit {

  constructor() { }

  public EnterData: EnterDataInterface;

  dataForm = new FormGroup({
    amount: new FormControl(''),
    persOrComp: new FormControl(''),
    titel: new FormControl(''),
});

  onSubmit() {
    alert(JSON.stringify(this.dataForm.value));
  }


  // Routing
  private navigate: DashboardComponent;

  ngOnInit() {
  }
}
