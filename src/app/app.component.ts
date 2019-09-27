import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from './models/item.interface';

@Component({
  selector:    'fin-app',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent
{
  title = 'finman';
}
