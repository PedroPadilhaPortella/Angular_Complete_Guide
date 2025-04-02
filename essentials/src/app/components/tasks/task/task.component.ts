import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TaskService } from './../../../services/task.service';
import { CardComponent } from "../../shared/card/card.component";
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
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
