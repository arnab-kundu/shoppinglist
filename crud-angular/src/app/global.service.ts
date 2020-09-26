import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

//https://stackoverflow.com/questions/37541783/how-to-subscribe-an-item-from-localstorage-in-angular-2-and-when-changed-get-va

@Injectable({providedIn: 'root'})
export class GlobalService {
  usernameValue = new BehaviorSubject(this.username);

  set username(value) {
    this.usernameValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('username', value);
  }

  get username() {
    return localStorage.getItem('username');
  }
}
