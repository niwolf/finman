import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map } from 'rxjs/operators';
import { UserData } from '../../../models/user-data.interface';

@Component({
  selector:    'fin-balance',
  templateUrl: './balance.component.html',
  styleUrls:   ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  balance$: Observable<{cash: number, account: number}>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit() {
    this.balance$ = this.auth.user.pipe(switchMap(user =>
    {
      const uid: string = user.uid;
      return this.db.doc<UserData>(`/users/${uid}`).get().pipe(map(snapshot => snapshot.get('initialBudget')));
    }));
  }

}
