import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, CustomSerializer } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NavigationComponent } from './main/navigation/navigation.component';
import { NotFound404Component } from './main/not-found-404/not-found-404.component';
import { RedditModule } from './reddit/reddit.module';
import { CoreModule } from './core/core.module';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RedditModule,
    CoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
