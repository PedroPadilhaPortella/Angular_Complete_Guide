import { Injectable } from '@angular/core';

import { DUMMY_TASKS } from '../data/dummy-tasks';
import { NewTask } from '../models/Task';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getTasksByUser(user: User) {
    return this.tasks.filter((task) => task.userId == user.id);
  }

  addTask(task: NewTask, user: User) {
    this.tasks.unshift({ ...task, id: new Date().getTime().toString(), userId: user.id });
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
