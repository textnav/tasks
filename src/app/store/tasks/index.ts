import * as fromRoot from '../'
import * as fromTasks from './tasks.reducer'
import { TasksState } from './tasks.reducer'
export * from './tasks.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State extends fromRoot.State {
  tasks: TasksState
}

export const selectTasksState = createFeatureSelector<TasksState>('tasks')

export const selectTasks = createSelector(selectTasksState, fromTasks.getTasksState)
export const selectSortedTasks = createSelector(selectTasks, tasks =>
  tasks.slice().sort((a, b) => {
    if (a.dueDate > b.dueDate) {
      return 1
    }
    if (b.dueDate > a.dueDate) {
      return -1
    }
    return 0
  })
)
export const selectActiveTasks = createSelector(selectTasks, tasks => tasks.filter(task => !task.done))
export const selectCompletedTasks = createSelector(selectTasks, tasks => tasks.filter(task => task.done))
export const selectCompletedTags = createSelector(selectCompletedTasks, tasks =>
  tasks.map(task => task.tags).reduce((acc, val) => acc.concat(val), [])
)
export const selectActiveTags = createSelector(selectActiveTasks, tasks =>
  tasks.map(task => task.tags).reduce((acc, val) => acc.concat(val), [])
)
