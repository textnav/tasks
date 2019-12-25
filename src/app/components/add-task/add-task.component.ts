import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { TasksState } from 'src/app/store/tasks'
import { addTask } from 'src/app/store/tasks/tasks.action'
import { Task } from 'src/app/modals/task'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskComponent implements OnInit {
  @Input() item: Task
  @Output() savedTask = new EventEmitter<boolean>()

  addTaskForm = new FormGroup({
    task: new FormControl('', Validators.required)
  })

  constructor(private store: Store<TasksState>) {}

  ngOnInit() {
    if (this.item) {
      this.addTaskForm.setValue({ task: this.item.text })
    }
  }

  get task() {
    return this.addTaskForm.get('task') as FormControl
  }

  onSubmit() {
    if (this.task.value) {
      const id = this.item ? this.item.id : null
      const done = this.item ? this.item.done : false
      this.store.dispatch(addTask(this.task.value, id, done))
      this.addTaskForm.reset()
      this.savedTask.emit()
    }
  }
}
