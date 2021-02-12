import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase';
import User = firebase.User;
import * as md5 from 'md5';

@Pipe({
  name: 'userImg',
})
export class UserImgPipe implements PipeTransform {
  public transform(user: User | null | undefined): string {
    const fallbackUrl = `https://secure.gravatar.com/avatar/?d=mp`;
    if (!user) {
      return fallbackUrl;
    }

    if (user.photoURL) {
      return user.photoURL;
    }

    return user.email
      ? `https://secure.gravatar.com/avatar/${md5(user.email)}?d=mp`
      : fallbackUrl;
  }
}
