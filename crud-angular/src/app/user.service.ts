import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {User} from "./models/user";
import {map} from "rxjs/operators";
import {Constant} from "./constant";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) {
  }

  login(user: User): Observable<User> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://' + Constant.IP + ':3000/api/account/login', user, {headers: headers})
      .pipe(map(res => res.json()))
  }

}
