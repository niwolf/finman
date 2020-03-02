import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {
  Item,
  Origin
} from '../models/item.interface';
import {
  ActivatedRoute,
  ParamMap,
  Router
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { ItemService } from '../services/item.service';

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

  constructor(route: ActivatedRoute,
              private auth: AngularFireAuth,
              private router: Router,
              private snack: MatSnackBar,
              private itemService: ItemService)
  {
    const uid: string = this.auth.auth.currentUser.uid;
    this.itemsCollection = this.itemService.getItems(uid);
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
        origin:   Origin.cash
      }).then(() => this.router.navigate(['/dashboard']))
          .catch(() => this.snack.open('Eintrag konnte nicht gespeichert werden.', 'OK', {duration: 5000}));
    }
  }
}
