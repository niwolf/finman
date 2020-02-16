import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryFn
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private afs: AngularFirestore) { }

  public items(userId: string, query?: QueryFn): Observable<Item[]>
  {
    return this.afs.collection<Item>(`users/${userId}/items`, query).valueChanges();
  }
}
