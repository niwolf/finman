export interface Item
{
  title: string;
  value: number;
  date: {seconds: number; nanoseconds: number};
  category: number;
  user: number;
}
