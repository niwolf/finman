import {
  Component,
  OnInit
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  merge,
  Observable,
  of
} from 'rxjs';
import { User } from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from './models/user-data.interface';
import { MatDialog } from '@angular/material';
import { InitialBudgetDialogComponent } from './dialogs/initial-budget-dialog/initial-budget-dialog.component';

@Component({
  selector:    'fin-app',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User> = merge(of(undefined), this.auth.user);

  constructor(public auth: AngularFireAuth, private route: ActivatedRoute, private db: AngularFirestore, private dialog: MatDialog) {}

  public get isDashboard(): boolean
  {
    return this.route.firstChild.component === DashboardComponent;
  }

  public ngOnInit(): void
  {
    this.auth.user.subscribe(user =>
    {
      const uid: string = user.uid;
      this.db.doc<UserData>(`users/${uid}`).get().subscribe(data =>
      {
        const initialBudget: {cash: number, account: number } = data.get('initialBudget');
        if(!initialBudget)
        {
          const dialogRef = this.dialog.open(InitialBudgetDialogComponent, {
            disableClose: true,
            autoFocus: true
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result)
            {
              this.db.doc<UserData>(`users/${uid}`).update({initialBudget: result});
            }
          });
        }
      });
    });
  }
}
