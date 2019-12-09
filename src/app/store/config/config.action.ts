import { createAction } from '@ngrx/store'

// [Config] Config module
export enum ConfigActionTypes {
  TOGGLE_COMPLETED = '[Config] Toggle Completed'
}

export const toggleCompleted = createAction(ConfigActionTypes.TOGGLE_COMPLETED)
