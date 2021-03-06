import { Injectable } from '@angular/core'
import Dexie from 'dexie'
import { Task, Tag } from '../modals/task'
import { OnlineOfflineService } from './online-offline.service'
import { from, Observable, zip } from 'rxjs'

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

  getAllDataFromDB(): Observable<any> {
    return zip(this.db.todos.toArray(), this.db.tags.toArray())
  }

  getAllTodosFromDB(): Observable<any> {
    return from(this.db.todos.toArray())
  }

  getAllTagsFromDB(): Observable<any> {
    return from(this.db.tags.toArray())
  }

  async setTagVisibility(tag: Tag) {
    await this.db.tags.put(tag)
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
    this.db.version(1).stores({ todos: 'id,text,tags,done,dueDate', tags: '++id,count,isVisible' })
  }

  private async updateTags() {
    const oldTags: Map<string, boolean> = new Map()
    let newTags: Map<string, number> = new Map()

    this.db.tags.each(element => oldTags.set(element.name, element.isVisible))

    await this.db.todos.orderBy('tags').keys(async tags => {
      const allTags = tags.flatMap(tag => tag)
      allTags.forEach(tag => {
        const count = newTags.get(tag) || 0
        newTags.set(tag, count + 1)
      })

      await this.db.tags.clear()
      const update = []
      newTags.forEach((count, id) => update.push({ id, isVisible: oldTags.get(id) || true, count }))
      await this.db.tags.bulkPut(update)
    })
  }

  private addToIndexedDb(todo: Task) {
    this.db.todos
      .add(todo)
      .then(async () => {
        this.updateTags()
        // const allItems: Task[] = await this.db.todos.toArray()
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
        this.updateTags()
        // const allItems: Task[] = await this.db.todos.toArray()
        // console.log('saved in DB, DB is now', allItems)
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e))
      })
  }
  private editInIndexedDb(task) {
    this.db.todos
      .update(task.id, { ...task })
      .then(async () => {
        this.updateTags()
        // const allItems: Task[] = await this.db.todos.toArray()
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
