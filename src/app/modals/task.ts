export class Task {
  id: string
  text: string
  tags?: string[]
  done: boolean
  dueDate?: Date
}

export class Tag {
  id: string
  isVisible: boolean
  count: number
}
