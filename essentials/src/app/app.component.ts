import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from "./components/header/header.component";
import { UserComponent } from "./components/user/user.component";
import { TasksComponent } from "./components/tasks/tasks.component";
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent, CommonModule],
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
