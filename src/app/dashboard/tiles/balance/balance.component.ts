import {
  Component,
  OnInit
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { UserData } from '../../../models/user-data.interface';
import { AuthService } from '../../../services/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector:    'fin-balance',
  templateUrl: './balance.component.html',
  styleUrls:   ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balance$: Observable<{ cash: number, account: number }>;

  constructor(private db: AngularFirestore, private auth: AuthService) {}

  ngOnInit() {
    this.balance$ = this.auth.user.pipe(
      filter(user => !isNullOrUndefined(user)),
      switchMap(user => {
        const uid: string = user.uid;
        return this.db.doc<UserData>(`/users/${uid}`).get().pipe(map(snapshot => snapshot.get('initialBudget')));
      })
    );
  }

}
