import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialBudgetDialogComponent } from './initial-budget-dialog.component';

describe('InitialBudgetDialogComponent', () => {
  let component: InitialBudgetDialogComponent;
  let fixture: ComponentFixture<InitialBudgetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialBudgetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialBudgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
