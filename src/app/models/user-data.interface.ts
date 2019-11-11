import { Item } from './item.interface';

export interface UserData
{
  items: Array<Item>;
  initialBudget: {
    cash: number,
    account: number
  };
}
