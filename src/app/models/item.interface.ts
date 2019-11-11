import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export enum Origin
{
  cash = 'cash',
  account = 'account'
}

export interface Item
{
  title: string;
  value: number;
  date: Timestamp;
  origin: Origin;
}
