import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  filter,
  switchMap
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { BudgetService } from '../../../services/budget.service';
import { AuthService } from '../../../services/auth.service';
import { Budget } from '../../../models/budget.interface';

@Component({
  selector:    'fin-balance',
  templateUrl: './balance.component.html',
  styleUrls:   ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balance$: Observable<Budget>;

  constructor(private budgetService: BudgetService, private auth: AuthService) {}

  ngOnInit() {
    this.balance$ = this.auth.user.pipe(
      filter(user => !isNullOrUndefined(user)),
      switchMap(user => {
        const uid: string = user.uid;
        return this.budgetService.getInitialBudget(uid);
      })
    );
  }

}
