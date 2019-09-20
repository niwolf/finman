import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss']
})
export class EnterDataComponent implements OnInit {

  constructor() { }

  private navigate: DashboardComponent;

  ngOnInit() {
  }

  public revenueButtonClicked(): void
  {
    this.navigate.navigate('/#');
  }

  public expenseButtonClicked(): void
  {
    this.navigate.navigate('/#');
  }

}
