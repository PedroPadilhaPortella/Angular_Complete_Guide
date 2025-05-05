import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>('desc');

  private tasksService = inject(TasksService);

  userTasks = computed(() => this.tasksService.allTasks()
    .filter((task) => task.userId === this.userId())
    .sort((a, b) => {
      if (this.order() === 'desc')
        return a.id > b.id ? -1 : 1;
      return a.id > b.id ? 1 : -1;
    })
  );
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const tasksService = inject(TasksService);
  const order = activatedRoute.queryParams['order'];
  const tasks = tasksService.allTasks().filter((task) => task.userId === activatedRoute.paramMap.get('userId'))

  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  return tasks.length ? tasks : [];
};