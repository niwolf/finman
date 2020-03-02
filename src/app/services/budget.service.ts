import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../models/user-data.interface';
import { Budget } from '../models/budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private afs: AngularFirestore) {}

  public getInitialBudget(userId: string): Observable<Budget> {
    return this.afs.doc<UserData>(`/users/${userId}`).get().pipe(map(snapshot => snapshot.get('initialBudget')));
  }

  public setInitialBudget(userId: string, budget: Budget): Promise<void> {
    return this.afs.doc<UserData>(`users/${userId}`).update({initialBudget: budget});
  }

  public getCurrentBudget(userId: string): Observable<Budget> {
    return this.afs.doc<UserData>(`/users/${userId}`).get().pipe(map(snapshot => snapshot.get('currentBudget')));
  }
}
