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
  ParamMap,
  Router
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(db: AngularFirestore,
              route: ActivatedRoute,
              private auth: AngularFireAuth,
              private router: Router)
  {
    this.itemsCollection = db.collection<Item>('items');
    route.queryParamMap.subscribe((params: ParamMap) => this.typeControl.setValue(params.get('revenue') ? 1 : -1));
  }

  save(formValue: any)
  {
    this.itemsCollection.add({
      title:    formValue.title,
      date:     formValue.date,
      value:    formValue.value * this.typeControl.value,
      user:     this.auth.auth.currentUser.uid,
      category: null
    }).then(() => this.router.navigate(['/dashboard']));
  }
}
