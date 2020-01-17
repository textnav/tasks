import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { Store } from '@ngrx/store'
import { ConfigState } from 'src/app/store/config'
import { selectActiveTags, selectCompletedTags } from 'src/app/store/tasks'
import { takeWhile } from 'rxjs/operators'

@Component({
  selector: 'app-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeListComponent implements OnInit, OnDestroy {
  completedTags: Map<string, number>
  activeTags: Map<string, number>
  isComponentActive = true
  constructor(private store: Store<ConfigState>, private changeDetector: ChangeDetectorRef) {
    this.completedTags = new Map()
    this.activeTags = new Map()
  }

  ngOnInit() {
    this.store
      .select(selectCompletedTags)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(tags => this.setTags('completed', tags))

    this.store
      .select(selectActiveTags)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(tags => this.setTags('active', tags))
  }
  ngOnDestroy() {
    this.isComponentActive = false
  }
  private setTags(type: string, tags: string[]) {
    if (type === 'completed') {
      this.completedTags.clear()
      tags.forEach(tag => {
        if (this.completedTags.has(tag)) {
          this.completedTags.set(tag, this.completedTags.get(tag) + 1)
        } else if (tag) {
          this.completedTags.set(tag, 1)
        }
      })
    } else if (type === 'active') {
      this.activeTags.clear()
      tags.forEach(tag => {
        if (this.activeTags.has(tag)) {
          this.activeTags.set(tag, this.activeTags.get(tag) + 1)
        } else if (tag) {
          this.activeTags.set(tag, 1)
        }
      })
    }
    this.changeDetector.detectChanges()
  }
}
