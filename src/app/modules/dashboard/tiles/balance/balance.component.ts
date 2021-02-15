import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BudgetService } from '../../../../core/services/budget.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Budget } from '../../../../core/models/budget.interface';

@Component({
  selector: 'fin-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
  balance$: Observable<Budget> = this.auth.currentUser$.pipe(
    switchMap((user) => this.budgetService.getCurrentBudget(user.uid))
  );

  constructor(
    private budgetService: BudgetService,
    private auth: AuthService
  ) {}
}
