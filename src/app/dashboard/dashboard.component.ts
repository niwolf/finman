import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';
import { Observable } from 'rxjs';
import { EnterDataComponent } from '../enter-data/enter-data.component';

@Component({
  selector: 'fin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  displayedColumns: string[] = ['select', 'title', 'value', 'date'];
  constructor(private afs: AngularFirestore)
  {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

}
