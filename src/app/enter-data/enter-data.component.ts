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
import {
  ActivatedRoute,
  Data,
  ParamMap
} from '@angular/router';

@Component({
  selector:    'fin-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls:   ['./enter-data.component.scss']
})
export class EnterDataComponent
{
  dataForm = new FormGroup({
    title: new FormControl(''),
    value: new FormControl(''),
    date:  new FormControl(new Date())
  });

  typeControl = new FormControl('');

  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(db: AngularFirestore, route: ActivatedRoute)
  {
    this.itemsCollection = db.collection<Item>('items');
    route.queryParamMap.subscribe((params: ParamMap) => this.typeControl.setValue(params.get('revenue') ? 1 : -1));
  }


  onSubmit()
  {
    this.itemsCollection.add({
      ...this.dataForm.value,
      value: this.dataForm.value.value * this.typeControl.value,
      user:     null,
      category: null
    });
  }
}
