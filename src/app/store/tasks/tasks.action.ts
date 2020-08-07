import { createAction, props } from '@ngrx/store'
import { Task, Tag } from 'src/app/modals/task'

// [Tasks] Tasks module
export enum TasksActionTypes {
  ADD_TASK = '[Tasks] Add Task',
  ADD_TASK_SUCCESS = '[Tasks] Add Task Success',
  INIT_TASK = '[Tasks] Init Task',
  INIT_TASK_SUCCESS = '[Tasks] Init Task Success',
  DELETE_TASK = '[Tasks] Delete Task',
  TOGGLE_TASK = '[Tasks] Toggle Task',
  TOGGLE_TAG = '[Tasks] Toggle Tag',
  ADD_TAGS = '[Tasks] Add Tags'
}

export const addTask = createAction(TasksActionTypes.ADD_TASK, (text: string, id: string, done: boolean) => ({ text, id, done }))
export const addTaskSuccess = createAction(TasksActionTypes.ADD_TASK_SUCCESS, props<Task>())
export const initTask = createAction(TasksActionTypes.INIT_TASK)
export const initTaskSuccess = createAction(TasksActionTypes.INIT_TASK_SUCCESS, props<{ tasks: Task[]; tags: Tag[] }>())
export const deleteTask = createAction(TasksActionTypes.DELETE_TASK, (id: string) => ({ id }))
export const toggleTask = createAction(TasksActionTypes.TOGGLE_TASK, (task: Task) => ({ task }))
export const addTags = createAction(TasksActionTypes.ADD_TAGS, (tags: string[]) => ({ tags }))
export const updateTag = createAction(TasksActionTypes.TOGGLE_TAG, (tag: Tag) => tag)
