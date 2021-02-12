import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth-types';
import { MatDialog } from '@angular/material/dialog';
import { InitialBudgetDialogComponent } from './dialogs/initial-budget-dialog/initial-budget-dialog.component';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { BudgetService } from './core/services/budget.service';

@Component({
  selector: 'fin-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User | null | undefined> = this.auth.user$;

  constructor(
    private auth: AuthService,
    private budgetService: BudgetService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.auth.currentUser$
      .pipe(
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
