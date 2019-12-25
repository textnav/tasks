import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { HomeComponent } from './components/home/home.component'
import { TaskItemComponent } from './components/task-item/task-item.component'
import { FooterComponent } from './components/footer/footer.component'
import { AddTaskComponent } from './components/add-task/add-task.component'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from './app.effects'
import { reducers, metaReducers } from './store'
import { TasksEffects } from './store/tasks/tasks.effect'
import { TimeToPipe } from './pipes/time-to.pipe'
import { TagHighlightPipe } from './pipes/tag-highlight.pipe'
import { BadgeListComponent } from './components/badge-list/badge-list.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskItemComponent,
    FooterComponent,
    AddTaskComponent,
    TimeToPipe,
    TagHighlightPipe,
    BadgeListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects, TasksEffects, AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
