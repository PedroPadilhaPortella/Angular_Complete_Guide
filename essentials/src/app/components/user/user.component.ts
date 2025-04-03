import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../models/User';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ alias: 'user', required: true }) user!: User;
  @Input({ alias: 'selected', required: true }) selected!: boolean;
  @Output('onSelectUser') onSelectUser: EventEmitter<User> = new EventEmitter<User>;

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  selectUser() {
    this.onSelectUser.emit(this.user);
  }
}
