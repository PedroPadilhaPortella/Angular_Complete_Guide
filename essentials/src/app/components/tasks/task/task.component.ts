import { Component, Input } from '@angular/core';

import { TaskService } from './../../../services/task.service';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ alias: 'task', required: true }) task!: Task;

  constructor(private taskService: TaskService) { }

  completeTask() {
    this.taskService.removeTask(this.task.id);
  }
}
