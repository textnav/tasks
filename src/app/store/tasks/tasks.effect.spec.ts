import { provideMockActions } from '@ngrx/effects/testing'
import { Observable, of } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { addTags, initTaskSuccess } from './tasks.action'
import { TasksEffects } from './tasks.effect'
import { cold, hot } from 'jasmine-marbles'

xdescribe('Task Selectors', () => {
  let actions$: Observable<any>

  const effects = TestBed.get<TasksEffects>(TasksEffects)

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$)]
    })
  })

  it('should return add tags action', () => {
    actions$ = hot('-a', { a: initTaskSuccess })
    const response = hot('---c', { s: addTags })
    expect(effects.initTaskSuccess$).toBeObservable(response)
  })
})
