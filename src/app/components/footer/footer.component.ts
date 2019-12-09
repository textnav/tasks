import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { ConfigState, selectCompletedVisible } from 'src/app/store/config'
import { takeWhile } from 'rxjs/operators'
import { toggleCompleted } from 'src/app/store/config/config.action'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  tagButtonLabel: string
  completeTaskButtonLabel: string
  isComponentActive = true
  constructor(private store: Store<ConfigState>) {}

  ngOnInit() {
    this.store
      .select(selectCompletedVisible)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(isOpen => (this.completeTaskButtonLabel = isOpen ? 'Hide' : 'Show'))
  }
  ngOnDestroy() {
    this.isComponentActive = false
  }

  toggleCompleted() {
    this.store.dispatch(toggleCompleted())
  }
}
