import { Component, OnInit } from '@angular/core';
import {
  Params,
  Router
} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public addButtonClicked():void
  {
    this.navigate('/enterData');
  }

  private navigate(routerLink: string): void
  {
    this.router.navigate([routerLink]);
  }
}
