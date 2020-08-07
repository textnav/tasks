import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store'
import { ConfigState } from 'src/app/store/config'
import { getTags } from 'src/app/store/tasks'
import { Tag } from 'src/app/modals/task'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss']
})
export class BadgeListComponent implements OnInit, OnDestroy {
  @Output() toggleTag = new EventEmitter<{ id: string; isVisible: boolean }>()
  tags$: Observable<Tag[]>
  isComponentActive = true
  constructor(private store: Store<ConfigState>) {}

  ngOnInit() {
    this.tags$ = this.store.select(getTags)
  }
  ngOnDestroy() {
    this.isComponentActive = false
  }
  toggle(tag: Tag) {
    const isVisible = !tag.isVisible
    console.log(tag)
    this.toggleTag.emit({ ...tag, isVisible })
  }
}
