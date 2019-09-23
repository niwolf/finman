import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EnterDataInterface } from '../enter-data.interface';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss']
})
export class EnterDataComponent implements OnInit {

  public EnterData: EnterDataInterface;
  constructor() { }

  // Routing
  private navigate: DashboardComponent;

  ngOnInit() {
  }
}
