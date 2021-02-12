import { Component, OnInit } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { User } from '@firebase/auth-types';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InitialBudgetDialogComponent } from './dialogs/initial-budget-dialog/initial-budget-dialog.component';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { BudgetService } from './core/services/budget.service';
import { isUser } from '@common/rxjs-operators/is-user';

@Component({
  selector: 'fin-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User | null | undefined> = merge(
    of(JSON.parse(localStorage.getItem('user') ?? '') ?? undefined),
    this.auth.user
  );

  constructor(
    private auth: AuthService,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.user$
      .pipe(
        isUser,
        switchMap((user) => {
          const uid: string = user.uid;
          return this.budgetService.getInitialBudget(uid).pipe(
            tap((initialBudget) => {
              if (!initialBudget) {
                const dialogRef = this.dialog.open(
                  InitialBudgetDialogComponent,
                  {
                    disableClose: true,
                    autoFocus: true,
                  }
                );

                dialogRef.afterClosed().subscribe((result) => {
                  if (result) {
                    this.budgetService.setInitialBudget(uid, result);
                  }
                });
              }
            })
          );
        })
      )
      .subscribe();
  }
}
