import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Task } from 'src/app/modals/task'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task
  @Output() toggleTask = new EventEmitter<boolean>()
  @Output() deleteTask = new EventEmitter<boolean>()

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.toggleTask.emit()
  }
  delete() {
    this.deleteTask.emit()
  }
}
