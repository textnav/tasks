import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { UUID } from 'angular2-uuid'

import { addTask, addTaskSuccess, initTask, initTaskSuccess, addTags, deleteTask, toggleTask } from './tasks.action'
import { map, catchError, mergeMap } from 'rxjs/operators'
import { TagsService } from 'src/app/services/tags.service'
import { TaskService } from 'src/app/services/task.service'
import { Task } from 'src/app/modals/task'
import { of } from 'rxjs'

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private tagService: TagsService, private readonly taskService: TaskService) {}

  // with createEffect
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      mergeMap(res => {
        const text = res.text
        const tags = this.tagService.getTags(text)
        const id = UUID.UUID()
        const dueDate = this.tagService.getDate(text)
        const task: Task = { text, tags, id, dueDate, done: false }
        this.taskService.addTodo(task)
        return [addTaskSuccess(task), addTags(tags)]
      })
    )
  )

  deleteTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTask),
        map(res => this.taskService.deleteTodo(res.id))
      ),
    { dispatch: false }
  )

  editTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleTask),
        map(res => this.taskService.editTodo(res.task))
      ),
    { dispatch: false }
  )

  initTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initTask),
      mergeMap(() =>
        this.taskService.getAllTodosFromDB().pipe(
          map(tasks => initTaskSuccess({ tasks })),
          catchError(err => of(initTaskSuccess({ tasks: null })))
        )
      )
    )
  )

  initTaskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initTaskSuccess),
      map(({ tasks }) => {
        let tags = []
        tasks.forEach(task => {
          const tag = this.tagService.getTags(task.text)
          tags = tag ? [...tags, ...tag] : tags
        })
        return addTags(tags)
      })
    )
  )
}
