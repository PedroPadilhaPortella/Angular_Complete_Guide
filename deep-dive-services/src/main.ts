import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { LogService } from './app/log.service';
import { InjectionToken } from '@angular/core';
import { TaskService } from './app/tasks/task.service';

export const LogServiceToken = new InjectionToken('LogService');

bootstrapApplication(AppComponent,
  {
    providers: [
      TaskService,
      { provide: LogServiceToken, useClass: LogService },
    ]
  }
).catch((err) => console.error(err));
