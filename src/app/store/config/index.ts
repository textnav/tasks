import * as fromRoot from '../'
import * as fromConfig from './config.reducer'
import { ConfigState } from './config.reducer'
export * from './config.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State extends fromRoot.State {
  config: ConfigState
}

export const selectConfigState = createFeatureSelector<ConfigState>('config')

export const selectCompletedVisible = createSelector(selectConfigState, fromConfig.getCompletedVisible)
