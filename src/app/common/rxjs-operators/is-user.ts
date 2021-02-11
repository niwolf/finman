import firebase from 'firebase';
import User = firebase.User;
import { filter } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export function userTypeGuard(user: User | null | undefined): user is User {
  return typeof user === 'object' && user !== null;
}

export const isUser: OperatorFunction<User | null | undefined, User> = filter(
  userTypeGuard
);
