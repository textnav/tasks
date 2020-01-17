import { toggleCompleted } from './config.action'
import { configReducer } from '.'

describe('loadTodoItems', () => {
  it('should toggle isCompleted Visible', () => {
    const initState = {
      isCompletedVisible: false
    }
    const newState = configReducer(initState, toggleCompleted)

    expect(newState.isCompletedVisible).toBe(true)
  })
})
