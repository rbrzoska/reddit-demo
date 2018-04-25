import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditDataService } from './reddit-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [RedditDataService]
})
export class CoreModule { }
