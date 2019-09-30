import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';

@Component({
  selector:    'fin-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls:   ['./enter-data.component.scss']
})
export class EnterDataComponent
{
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(db: AngularFirestore)
  {
    this.itemsCollection = db.collection<Item>('items');
  }

  dataForm = new FormGroup({
    title: new FormControl(''),
    value: new FormControl(''),
    date:  new FormControl('')
  });

  onSubmit()
  {
    this.itemsCollection.add({
      ...this.dataForm.value,
      user:     null,
      category: null
    });
  }
}
