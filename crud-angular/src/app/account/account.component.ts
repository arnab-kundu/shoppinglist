import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../user.service";
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService]
})
export class AccountComponent implements OnInit {

  formType: string = 'LOGIN';
  user: User= {
    id: '',
    username: '',
    email: '',
    password: ''
  };

  constructor(private service: UserService, private globalSrv: GlobalService) {
    console.log('token:' + localStorage.getItem('token'));
    if (localStorage.getItem('token') != null) {
      this.formType = 'ACCOUNT';
      this.getUserById(localStorage.getItem('token'));
    }
  }

  ngOnInit(): void {
  }

  login(form) {
    console.log(form.value);
    let user: User = {
      id: '',
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    };
    this.service.login(user).subscribe(user => {
      console.log(user);
      this.user = user;
      this.formType = 'ACCOUNT';
      localStorage.setItem('token', user.id)
      this.globalSrv.username = user.username;
      //TODO how to handle 401
    })

  }

  register(form) {
    console.log(form.value);
    let user: User = {
      id: '',
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    };
    this.service.register(user).subscribe(user => {
      console.log(user);
      //localStorage.setItem('token', user.id);
      //TODO how to handle 401
      this.formType = 'LOGIN';
    })
  }

  getUserById(userId: string) {
    this.service.getUserById(userId).subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    this.user = null;
    this.formType = 'LOGIN';
    this.globalSrv.username = 'My Account';
  }

  switchToRegister() {
    this.formType = 'REGISTER';
  }

  switchToLogin() {
    this.formType = 'LOGIN';
  }

}
