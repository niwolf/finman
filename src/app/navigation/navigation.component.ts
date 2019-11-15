import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay
} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as md5 from 'md5';
import { RouterOutlet } from '@angular/router';
import { UserData } from '../models/user-data.interface';
import { InitialBudgetDialogComponent } from '../dialogs/initial-budget-dialog/initial-budget-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { EnterDataComponent } from '../enter-data/enter-data.component';

@Component({
  selector:    'fin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls:   ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
    map(result => result.matches),
    shareReplay()
  );

  private readonly defaultUserImg = `https://secure.gravatar.com/avatar/${md5(this.auth.auth.currentUser.email)}?d=mp`;
  userImg: string = this.auth.auth.currentUser.photoURL || this.defaultUserImg;

  @ViewChild(RouterOutlet, {static: true})
  private routerOutlet: RouterOutlet;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  public ngOnInit(): void {
    const uid: string = this.auth.auth.currentUser.uid;
    this.db.doc<UserData>(`users/${uid}`).get().subscribe(data => {
      const initialBudget: { cash: number, account: number } = data.get('initialBudget');
      if (!initialBudget) {
        const dialogRef = this.dialog.open(InitialBudgetDialogComponent, {
          disableClose: true,
          autoFocus:    true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) { this.db.doc<UserData>(`users/${uid}`).update({initialBudget: result}); }
        });
      }
    });
  }

  public get editorActivated(): boolean {
    return this.routerOutlet ? this.routerOutlet.component instanceof EnterDataComponent : false;
  }

  public signOut(): void {
    this.auth.auth.signOut();
  }
}
