import {Timestamp} from '@firebase/firestore-types';

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
  importId?: string;
}
