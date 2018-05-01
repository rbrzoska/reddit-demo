import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFound404Component } from './main/not-found-404/not-found-404.component';
import { ArticleComponent } from './reddit/containers/article/article.component';
import { ArticlesComponent } from './reddit/containers/articles/articles.component';
import { ArticleResolverService } from './core/article-resolver.service';
import { ArticlesListResolverService } from './core/articles-list-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/articles/best', pathMatch: 'full' },
  { path: 'articles', children: [
      { path: ':category/page/:direction/:pageId', component: ArticlesComponent, resolve: { articles: ArticlesListResolverService } },
      { path: ':category', component: ArticlesComponent, pathMatch: 'full', resolve: { articles: ArticlesListResolverService } },
      { path: 'details/:id', component: ArticleComponent, resolve: { article: ArticleResolverService } },
      { path: '**', redirectTo: '../404' }
    ]},
  { path: '404', component: NotFound404Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
