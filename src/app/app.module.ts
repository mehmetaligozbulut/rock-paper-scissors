import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PlayGameComponent } from './components/play-game/play-game.component';
import { appReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EnglishCaracterPipe } from './pipes/english-caracter.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { OutsideClickDirective } from './directives/outside-click.directive';
import { LoginGuard } from './guards/login.guard';

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        rootReducer: [
          'gameState'
        ]
      }
    ],
    rehydrate: true,
  })(reducer)
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayGameComponent,
    ModalComponent,
    EnglishCaracterPipe,
    OutsideClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      {
        rootReducer: appReducers,
      },
      {
        metaReducers
      }
    ),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
