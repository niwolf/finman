import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  map,
  switchMap
} from 'rxjs/operators';
import { UserData } from '../models/user-data.interface';
import { InitialBudgetDialogComponent } from '../dialogs/initial-budget-dialog/initial-budget-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InitialBudgetGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private dialog: MatDialog) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user.pipe(switchMap(user =>
    {
      const uid: string = user.uid;
      return this.db.doc<UserData>(`users/${uid}`).get().pipe(map(data =>
      {
        const initialBudget: {cash: number, account: number } = data.get('initialBudget');
        if (!initialBudget)
        {
          const dialogRef = this.dialog.open(InitialBudgetDialogComponent, {
            disableClose: true,
            autoFocus: true
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result)
            {
              this.db.doc<UserData>(`users/${uid}`).update({initialBudget: result});
            }
          });
        }
        return true;
      }));
    }));
  }

}
