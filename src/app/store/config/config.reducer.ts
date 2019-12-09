import { toggleCompleted } from './config.action'
import { createReducer, on, Action } from '@ngrx/store'

export interface ConfigState {
  isCompletedVisible: boolean
}

export const initialState: ConfigState = {
  isCompletedVisible: false
}

export const reducer = createReducer(
  initialState,
  on(toggleCompleted, state => ({
    ...state,
    isCompletedVisible: !state.isCompletedVisible
  }))
)

export const getCompletedVisible = (state: ConfigState) => state.isCompletedVisible

export function configReducer(state: ConfigState | undefined, action: Action) {
  return reducer(state, action)
}
