import { Injectable } from '@angular/core'
import Dexie from 'dexie'
import { Task } from '../modals/task'
import { OnlineOfflineService } from './online-offline.service'
import { from, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class TaskService {
  private db: any

  constructor(private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService)

    this.createDatabase()
  }

  addTodo(todo: Task) {
    if (!this.onlineOfflineService.isOnline) {
      this.addToIndexedDb(todo)
    }
  }
  editTodo(todo: Task) {
    if (!this.onlineOfflineService.isOnline) {
      this.editInIndexedDb(todo)
    }
  }

  deleteTodo(id: string) {
    if (!this.onlineOfflineService.isOnline) {
      this.deleteFromIndexedDb(id)
    }
  }

  getAllTodosFromDB(): Observable<any> {
    return from(this.db.todos.toArray())
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        // console.log('went online')
        // console.log('sending all stored items')
        this.sendItemsFromIndexedDb()
      } else {
        // console.log('went offline, storing in indexdb')
      }
    })
  }

  private createDatabase() {
    this.db = new Dexie('ToDoDatabase')
    this.db.version(1).stores({ todos: 'id,text,tags,done,dueDate' })
  }

  private addToIndexedDb(todo: Task) {
    this.db.todos
      .add(todo)
      .then(async () => {
        const allItems: Task[] = await this.db.todos.toArray()
        // console.log('saved in DB, DB is now', allItems)
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e))
      })
  }
  private deleteFromIndexedDb(id: string) {
    this.db.todos
      .delete(id)
      .then(async () => {
        const allItems: Task[] = await this.db.todos.toArray()
        // console.log('saved in DB, DB is now', allItems)
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e))
      })
  }
  private editInIndexedDb(task) {
    this.db.todos
      .update(task.id, { done: !task.done })
      .then(async () => {
        const allItems: Task[] = await this.db.todos.toArray()
        // console.log('saved in DB, DB is now', allItems)
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e))
      })
  }

  private async sendItemsFromIndexedDb() {
    const allItems: Task[] = await this.db.todos.toArray()
    allItems.forEach((item: Task) => {
      this.db.todos.delete(item.id).then(() => {
        // console.log(`item ${item.id} sent and deleted locally`)
      })
    })
  }
}
