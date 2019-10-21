import {firestore} from 'firebase';
import Timestamp = firestore.Timestamp;

export interface Item
{
  title: string;
  value: number;
  date: Timestamp;
}
