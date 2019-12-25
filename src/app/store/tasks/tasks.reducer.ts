import { addTask, addTaskSuccess, initTaskSuccess, addTags, deleteTask, toggleTask } from './tasks.action'
import { createReducer, on, Action } from '@ngrx/store'
import { Task } from 'src/app/modals/task'

export interface TasksState {
  tasks: Task[]
}

export const initialState: TasksState = {
  tasks: []
}

export const reducer = createReducer(
  initialState,
  on(addTaskSuccess, (state, { text, tags, id, dueDate, done }) => {
    const task: Task = {
      id,
      done,
      text,
      tags,
      dueDate
    }
    const tasks = [...state.tasks.filter(item => item.id !== id), task]

    return { ...state, tasks }
  }),
  on(deleteTask, (state, { id }) => {
    const tasks = state.tasks.filter(task => task.id !== id)
    return { ...state, tasks }
  }),
  on(toggleTask, (state, { task }) => {
    const tasks = state.tasks.map(item => (item.id === task.id ? { ...item, done: !item.done } : item))
    return { ...state, tasks }
  }),
  on(initTaskSuccess, (state, { tasks }) => {
    return { ...state, tasks }
  })
)

export const getTasksState = (state: TasksState) => state.tasks

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action)
}
