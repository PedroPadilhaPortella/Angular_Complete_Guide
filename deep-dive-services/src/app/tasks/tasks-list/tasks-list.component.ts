import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { TASK_STATUS_OPTIONS, taskStatusOptions } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [
    { provide: TASK_STATUS_OPTIONS, useValue: taskStatusOptions }
  ]
})
export class TasksListComponent {
  private taskService = inject(TaskService);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  private selectedFilter = signal<string>('ALL');

  tasks = computed(() => {
    return this.taskService.getTasks(this.selectedFilter());
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
