import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { BudgetService } from '../../../services/budget.service';

@Component({
  selector:    'fin-balance',
  templateUrl: './balance.component.html',
  styleUrls:   ['./balance.component.scss']
})
export class BalanceComponent {

  balance$: Observable<{cash: number, account: number}> = this.auth.user.pipe(
    switchMap(user => this.budgetService.currentBudget(user.uid))
  );

  constructor(private budgetService: BudgetService, private auth: AngularFireAuth) { }

}
