import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Observable } from 'rxjs'
import { Task } from 'src/app/modals/task'
import { Store } from '@ngrx/store'
import { ConfigState, selectCompletedVisible } from 'src/app/store/config'
import { selectActiveTasks, selectCompletedTasks, selectTasks, selectSortedTasks } from 'src/app/store/tasks'
import { initTask, deleteTask, toggleTask } from 'src/app/store/tasks/tasks.action'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  allTasks$: Observable<Task[]>
  activeTasks$: Observable<Task[]>
  completedTasks$: Observable<Task[]>
  showCompleted$: Observable<boolean>
  constructor(private store: Store<ConfigState>) {}

  ngOnInit() {
    this.allTasks$ = this.store.select(selectSortedTasks)
    this.activeTasks$ = this.store.select(selectActiveTasks)
    this.completedTasks$ = this.store.select(selectCompletedTasks)
    this.showCompleted$ = this.store.select(selectCompletedVisible)

    this.store.dispatch(initTask())
  }
  deleteTask(id: string) {
    this.store.dispatch(deleteTask(id))
  }
  toggleTask(task: Task) {
    this.store.dispatch(toggleTask(task))
  }
  trackByFn(index, item) {
    return item ? item.id : index
  }
}