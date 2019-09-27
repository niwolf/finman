import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fin-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  toggled:boolean = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public addClick():void {
    this.toggle();
    this.navigate('/enterData');
  }

  public removeClick():void {
    this.toggle();
    this.navigate('/enterData');
  }

  public navigate(routerLink: string): void {
    this.router.navigate([routerLink]);
  }

  public toggle():void
  {
    this.toggled = !this.toggled;
  }
}
