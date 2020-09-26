import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService]
})
export class AccountComponent implements OnInit {

  constructor(private service: UserService) {
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
      localStorage.setItem('token', user.id)
      //TODO how to handle 401
    })

  }

}
