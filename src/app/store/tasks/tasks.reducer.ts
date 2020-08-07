import { addTaskSuccess, initTaskSuccess, deleteTask, toggleTask, updateTag } from './tasks.action'
import { createReducer, on, Action } from '@ngrx/store'
import { Task, Tag } from 'src/app/modals/task'

export interface TasksState {
  tasks: Task[]
  tags: Tag[]
}

export const initialState: TasksState = {
  tasks: [],
  tags: []
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
  on(updateTag, (state, newTag) => {
    const tags = state.tags.map(tag => (tag.id === newTag.id ? newTag : tag))
    return { ...state, tags }
  }),
  on(initTaskSuccess, (state, { tasks, tags }) => {
    return { ...state, tasks, tags }
  })
)

export const getTasksState = (state: TasksState) => state.tasks
export const getTagsState = (state: TasksState) => state.tags

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action)
}
