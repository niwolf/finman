import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn
} from '@angular/fire/firestore';
import {
  concat,
  from,
  Observable
} from 'rxjs';
import {
  count,
  map
} from 'rxjs/operators';
import { Item } from '../models/item.interface';

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

  public addItems(userId, items: Item[]): Observable<number> {
    const reqs$: Observable<DocumentReference>[] = items.map(item => from(this.addItem(userId, item)));
    return concat(reqs$).pipe(count());
  }

  private getItemCollection(userId: string, queryFn?: QueryFn): AngularFirestoreCollection<Item> {
    return queryFn ?
      this.afs.collection<Item>(`users/${userId}/items`, queryFn) :
      this.afs.collection<Item>(`users/${userId}/items`);
  }
}
