import { Inject, inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LogServiceToken } from '../../main';
import { LogService } from '../log.service';

// @Injectable({
//   providedIn: 'root'
// })
export class TaskService {
  private logService = inject<LogService>(LogServiceToken);

  private tasks = signal<Task[]>([]);

  // constructor(@Inject(LogServiceToken) private logService: LogService) { }

  addTask(task: { title: string, description: string }) {
    const newTask: Task = { ...task, id: Date.now().toString(), status: 'OPEN' };
    this.tasks.update((tasks) => [...tasks, newTask]);
    this.logService.log(`New task added: ${JSON.stringify(newTask)}`);
  }

  getTasks(status?: string) {
    this.logService.log(`Tasks retrieved with ${status ?? 'no'} status`);
    if (!status || status === 'ALL') return this.tasks();
    return this.tasks().filter((task) => task.status === status);
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task));
    this.logService.log(`Task ${taskId} status updated to ${status}`);
  }
}
