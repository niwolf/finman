import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QueryFn
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private afs: AngularFirestore) { }

  public getItems(userId: string, queryFn?: QueryFn): AngularFirestoreCollection<Item> {
    return queryFn ?
      this.afs.collection<Item>(`users/${userId}/items`, queryFn) :
      this.afs.collection<Item>(`users/${userId}/items`);
  }
}
