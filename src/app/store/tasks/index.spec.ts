import * as fromTaskSelector from './'
import { Task } from 'src/app/modals/task'

describe('Task Selectors', () => {
  it('should return all tasks', () => {
    const task1: Task = { id: '1', text: 'hi', done: true, dueDate: new Date('2020/12/21') }
    const tasks: Task[] = [task1]
    expect(fromTaskSelector.selectTasks.projector({ tasks })).toBe(tasks)
  })

  xit('should return active tasks', () => {
    const task1: Task = { id: '1', text: 'hi', done: true, dueDate: new Date('2020/12/21') }
    const task2: Task = { id: '2', text: 'hello', done: false, dueDate: new Date('2020/12/13') }
    const tasks: Task[] = [task1, task2]
    expect(fromTaskSelector.selectActiveTasks.projector({ tasks })).toEqual([task1])
  })
})
