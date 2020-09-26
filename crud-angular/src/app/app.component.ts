import {Component} from '@angular/core';
import {GlobalService} from "./global.service";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-angular';
  username = 'My Account';
  token = '';

  constructor(private globalSrv: GlobalService) {
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      }
    globalSrv.usernameValue.subscribe((nextValue) => {
      this.username = nextValue;
      //alert(nextValue);  // this will happen on every change
    })
  }

  logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    this.token = '';
    this.username = 'My Account';
  }
}
