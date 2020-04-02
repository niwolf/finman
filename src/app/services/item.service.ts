import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private afs: AngularFirestore) {}

  public getItems(userId, queryFn?: QueryFn): Observable<Item[]> {
    return this.getItemCollection(userId, queryFn).valueChanges();
  }

  public addItem(userId: string, item: Item): Promise<DocumentReference> {
    return this.getItemCollection(userId).add(item);
  }

  public addItems(userId, items: Item[]): Observable<Item[]> {
    const batch = this.afs.firestore.batch();
    items.forEach(item => {
      batch.set(this.getItemCollection(userId).doc(this.afs.createId()).ref, item);
    });
    return fromPromise(batch.commit()).pipe(map(() => items));
  }

  private getItemCollection(userId: string, queryFn?: QueryFn): AngularFirestoreCollection<Item> {
    return queryFn ?
      this.afs.collection<Item>(`users/${userId}/items`, queryFn) :
      this.afs.collection<Item>(`users/${userId}/items`);
  }
}
