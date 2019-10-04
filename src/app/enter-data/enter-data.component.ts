import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
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
import { MatSnackBar } from '@angular/material';

@Component({
  selector:    'fin-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls:   ['./enter-data.component.scss']
})
export class EnterDataComponent
{
  typeControl = new FormControl('');
  titleControl = new FormControl('', Validators.required);
  valueControl = new FormControl('', [Validators.required, Validators.min(0)]);
  dateControl = new FormControl(new Date(), Validators.required);

  dataForm = new FormGroup({
    title: this.titleControl,
    value: this.valueControl,
    date:  this.dateControl
  });

  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(db: AngularFirestore,
              route: ActivatedRoute,
              private auth: AngularFireAuth,
              private router: Router,
              private snack: MatSnackBar)
  {
    this.itemsCollection = db.collection<Item>('items');
    route.queryParamMap.subscribe((params: ParamMap) => this.typeControl.setValue(params.get('revenue') ? 1 : -1));
  }

  save(formValue: any)
  {
    if (this.dataForm.valid)
    {
      this.itemsCollection.add({
        title:    formValue.title,
        date:     formValue.date,
        value:    formValue.value * this.typeControl.value,
        user:     this.auth.auth.currentUser.uid,
        category: null
      }).then(() => this.router.navigate(['/dashboard']))
          .catch(() => this.snack.open('Eintrag konnte nicht gespeichert werden.', 'OK', {duration: 5000}));
    }
  }
}
