import { Component, EventEmitter, Output } from '@angular/core';

import { NewTask } from '../../../models/Task';

@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output('onCancel') onCancelTask: EventEmitter<void> = new EventEmitter<void>;
  @Output('onCreate') onCreateTask: EventEmitter<NewTask> = new EventEmitter<NewTask>;

  title = '';
  summary = '';
  dueDate = '';

  onCancel() {
    this.onCancelTask.emit();
  }

  onCreate() {
    const task: NewTask = { title: this.title, summary: this.summary, dueDate: this.dueDate };
    this.onCreateTask.emit(task);
  }
}
