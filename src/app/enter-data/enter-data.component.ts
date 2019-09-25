import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EnterDataInterface } from '../enter-data.interface';
import { FormControl, FormGroup } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Item } from '../models/item.interface';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss']
})
export class EnterDataComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<Item>('items');
  }

  public EnterData: EnterDataInterface;

  dataForm = new FormGroup({
    title: new FormControl(''),
    value: new FormControl(''),
    date: new FormControl('')
});

  onSubmit()
  {
    // alert(JSON.stringify(this.dataForm.value));
    this.itemsCollection.add({
      ...this.dataForm.value,
      user: null,
      category: null
    });
  }



  // Routing
  private navigate: DashboardComponent;

  ngOnInit() {
  }
}
