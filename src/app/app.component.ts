import {
  Component,
  OnInit
} from '@angular/core';
import {
  merge,
  Observable,
  of
} from 'rxjs';
import { User } from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { InitialBudgetDialogComponent } from './dialogs/initial-budget-dialog/initial-budget-dialog.component';
import {
  filter,
  switchMap,
  tap
} from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { BudgetService } from './services/budget.service';

@Component({
  selector:    'fin-app',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User> = merge(
    of(JSON.parse(sessionStorage.getItem('user')) ?? undefined),
    this.auth.user
  );

  constructor(private auth: AuthService, private budgetService: BudgetService, private route: ActivatedRoute, private dialog: MatDialog) {}

  public get isDashboard(): boolean
  {
    return this.route.firstChild?.component === DashboardComponent;
  }

  public ngOnInit(): void
  {
    this.auth.user.pipe(
      filter(user => !!user),
      switchMap(user =>
      {
        const uid: string = user.uid;
        return this.budgetService.getInitialBudget(uid).pipe(tap(initialBudget =>
        {
          if (!initialBudget)
          {
            const dialogRef = this.dialog.open(InitialBudgetDialogComponent, {
              disableClose: true,
              autoFocus:    true
            });

            dialogRef.afterClosed().subscribe(result =>
            {
              if (result)
              {
                this.budgetService.setInitialBudget(uid, result);
              }
            });
          }
        }));
      })
    ).subscribe();
  }
}
