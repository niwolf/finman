import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fin-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public addClick():void {
    this.navigate('/enterData');
  }

  public removeClick():void {
    this.navigate('/enterData');
  }

  public navigate(routerLink: string): void {
    this.router.navigate([routerLink]);
  }
}
