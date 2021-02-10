import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private afs: AngularFirestore) {}

  public getItems(userId, queryFn?: QueryFn): Observable<Item[]> {
    return this.getItemCollection(userId, queryFn).valueChanges();
  }

  public addItem(userId: string, item: Item): Promise<DocumentReference> {
    return this.getItemCollection(userId).add(item);
  }

  private getItemCollection(
    userId: string,
    queryFn?: QueryFn
  ): AngularFirestoreCollection<Item> {
    return queryFn
      ? this.afs.collection<Item>(`users/${userId}/items`, queryFn)
      : this.afs.collection<Item>(`users/${userId}/items`);
  }
}
