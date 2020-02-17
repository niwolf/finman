import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../models/user-data.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private afs: AngularFirestore) { }

  public currentBudget(userId: string): Observable<{account: number, cash: number}>
  {
    return this.afs.doc<UserData>(`/users/${userId}`).get().pipe(map(snapshot => snapshot.get('currentBudget')));
  }
}
