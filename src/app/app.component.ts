import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Item
{
  title: string;
  value: number;
  createdAt: Date;
  category: number;
  user: number;
}

@Component({
  selector:    'fin-app',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent
{
  title = 'finman';

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore)
  {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  addItem(item: Item)
  {
    this.itemsCollection.add(item);
  }
}
