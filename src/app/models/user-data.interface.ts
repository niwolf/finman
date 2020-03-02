import { Item } from './item.interface';
import { Budget } from './budget.interface';

export interface UserData
{
  items: Array<Item>;
  initialBudget: Budget;
}
