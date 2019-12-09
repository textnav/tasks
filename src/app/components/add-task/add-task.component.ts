import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { TasksState } from 'src/app/store/tasks'
import { addTask } from 'src/app/store/tasks/tasks.action'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskComponent implements OnInit {
  addTaskForm = new FormGroup({
    task: new FormControl('', Validators.required)
  })

  constructor(private store: Store<TasksState>) {}

  ngOnInit() {}

  get task() {
    return this.addTaskForm.get('task') as FormControl
  }

  onSubmit() {
    if (this.task.value) {
      this.store.dispatch(addTask(this.task.value))
      this.addTaskForm.reset()
    }
  }
}
