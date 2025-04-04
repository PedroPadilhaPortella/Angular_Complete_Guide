import { Injectable } from '@angular/core';
import { DUMMY_USERS } from '../data/dummy-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = DUMMY_USERS;

  getUsers() {
    return this.users;
  }
}
