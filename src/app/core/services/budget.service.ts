import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../models/user-data.interface';
import { Budget } from '../models/budget.interface';
import { AngularFirestoreDocument } from '@angular/fire/firestore/document/document';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    constructor(private afs: AngularFirestore) {}

    public getInitialBudget(userId: string): Observable<Budget> {
        return this.getUserDoc(userId)
            .get()
            .pipe(map((snapshot) => snapshot.get('initialBudget')));
    }

    public setInitialBudget(userId: string, budget: Budget): Promise<void> {
        return this.getUserDoc(userId).update({ initialBudget: budget });
    }

    public getCurrentBudget(userId: string): Observable<Budget> {
        return this.getUserDoc(userId)
            .get()
            .pipe(map((snapshot) => snapshot.get('currentBudget')));
    }

    private getUserDoc(userId: string): AngularFirestoreDocument<UserData> {
        return this.afs.doc<UserData>(`/users/${userId}`);
    }
}
