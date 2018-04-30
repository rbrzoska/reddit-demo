import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { NotFound404Component } from './main/not-found-404/not-found-404.component';
import { RedditModule } from './reddit/reddit.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RedditModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
