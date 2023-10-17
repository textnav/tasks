import { Injectable } from '@angular/core'
import * as chrono from 'chrono-node'

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tagRegex = /#\b\S+?(\s|$)/gm

  constructor() {}

  getDate(text: string): Date {
    return chrono.parseDate(text)
  }
  getTags(text: string): string[] {
    const tags = text ? text.match(this.tagRegex) : null
    if (tags) {
      return tags.map(tag => tag.trim())
    }
    return []
  }
}
