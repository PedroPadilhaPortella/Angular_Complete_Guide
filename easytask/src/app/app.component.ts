import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  users: User[] = [];

  selectedUser?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
