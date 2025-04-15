import { InjectionToken } from "@angular/core";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type TaskStatusOption = {
  value: TaskStatus;
  text: string;
};

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOption[]>('task-status-options');

export const taskStatusOptions: TaskStatusOption[] = [
  { value: 'OPEN', text: 'Open' },
  { value: 'IN_PROGRESS', text: 'In-Progress' },
  { value: 'DONE', text: 'Completed' },
];

// export const taskStatusOptionsProvider: Provider = {
//   provide: TASK_STATUS_OPTIONS,
//   useValue: taskStatusOptions
// };