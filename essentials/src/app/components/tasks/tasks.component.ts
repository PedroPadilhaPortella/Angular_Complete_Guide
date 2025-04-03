import { Component, Input } from '@angular/core';

import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from '../../services/task.service';
import { TaskComponent } from './task/task.component';
import { DUMMY_TASKS } from '../../data/dummy-tasks';
import { NewTask } from '../../models/Task';
import { User } from '../../models/User';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  dummyTasks = DUMMY_TASKS;

  @Input({ alias: 'user', required: true }) user!: User;

  isTaskModalOpen = false;

  constructor(private taskService: TaskService) { }

  get tasks() {
    return this.taskService.getTasksByUser(this.user);
  }

  createTask(task: NewTask) {
    this.taskService.addTask(task, this.user);
    this.closeAddTaskModal();
  }

  openAddTaskModal = () => (this.isTaskModalOpen = true);

  closeAddTaskModal = () => (this.isTaskModalOpen = false);
}
