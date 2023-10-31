import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { Store } from '@ngrx/store'
import { Task } from 'src/app/modals/task'
import { TasksState } from 'src/app/store/tasks'
import { addTask } from 'src/app/store/tasks/tasks.action'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task
  @Output() toggleTask = new EventEmitter<boolean>()
  @Output() deleteTask = new EventEmitter<boolean>()
  isEditing = false
  circleIndex = this.randomValue
  tickIndex = this.randomValue
  eraserIndex = 0

  constructor(private store: Store<TasksState>) {}

  private get randomValue() {
    return Math.floor(Math.random() * 4 + 1)
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const curr = changes.task.currentValue
    if (curr?.done) {
      this.tickIndex = this.randomValue
    } else {
      this.tickIndex = 0
    }
  }

  handleAction() {
    if (this.isEditing) this.delete()
    else this.toggle()
  }
  toggle() {
    this.tickIndex = this.randomValue
    this.toggleTask.emit()
  }
  delete() {
    this.deleteTask.emit()
  }
  edit() {
    this.isEditing = true
    this.eraserIndex = 1
    this.tickIndex = 0
    this.circleIndex = 0
  }
  save() {
    this.isEditing = false
    this.eraserIndex = 0
    this.circleIndex = this.randomValue
    this.tickIndex = this.randomValue
  }
  update() {
    if (this.task.text) {
      const id = this.task ? this.task.id : null
      const done = this.task ? this.task.done : false
      this.store.dispatch(addTask(this.task.text, id, done))
      this.save()
    }
  }
  cancel() {
    this.isEditing = false
  }
  handleClick() {
    if (this.isEditing) {
      this.delete()
    } else {
      this.toggle()
    }
  }
}
