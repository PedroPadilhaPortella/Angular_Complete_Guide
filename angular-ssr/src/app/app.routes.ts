import { inject } from "@angular/core";
import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.9) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'Angular Routing'
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    loadChildren: () => import('./users/users.routes').then(module => module.routes),
    canMatch: [dummyCanMatch],
    data: { message: 'Hello' },
    resolve: { userName: resolveUserName },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]