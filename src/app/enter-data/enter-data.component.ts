import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Origin } from '../models/item.interface';
import {
  ActivatedRoute,
  ParamMap,
  Router
} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ItemService } from '../services/item.service';
import { AuthService } from '../services/auth.service';

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

  constructor(route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private snack: MatSnackBar,
              private itemService: ItemService)
  {
    route.queryParamMap.subscribe((params: ParamMap) => this.typeControl.setValue(params.get('revenue') ? 1 : -1));
  }

  save(formValue: any)
  {
    if (this.dataForm.valid)
    {
      const uid: string = this.auth.currentUser.uid;
      this.itemService.addItem(uid, {
        title:    formValue.title,
        date:     formValue.date,
        value:    formValue.value * this.typeControl.value,
        origin:   Origin.cash
      }).then(() => this.router.navigate(['/dashboard']))
          .catch(() => this.snack.open('Eintrag konnte nicht gespeichert werden.', 'OK', {duration: 5000}));
    }
  }
}
