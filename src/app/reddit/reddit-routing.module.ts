import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArticleComponent} from './containers/article/article.component';
import { ArticlesComponent } from './containers/articles/articles.component';

const routes: Routes = [
  {path: 'articles', children: [
      { path: '', component: ArticlesComponent },
      { path: ':id', component: ArticleComponent }

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedditRoutingModule { }
