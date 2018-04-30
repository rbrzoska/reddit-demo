import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedditDataService } from './reddit-data.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockBackendInterceptorService } from './mock-backend-interceptor.service';
import { ArticlesListResolverService } from './articles-list-resolver.service';
import { ArticleResolverService } from './article-resolver.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomStrategy } from './route-reuse-strategy';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [RedditDataService,
    { provide: HTTP_INTERCEPTORS, useClass: MockBackendInterceptorService, multi: true },
    {provide: RouteReuseStrategy, useClass: CustomStrategy},
    ArticlesListResolverService,
    ArticleResolverService]
})
export class CoreModule {
}
