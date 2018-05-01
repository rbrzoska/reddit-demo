import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './containers/article/article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ArticleCommentsComponent } from './components/article-comments/article-comments.component';
import { ArticleCommentsFormComponent } from './components/article-comments-form/article-comments-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleCommentItemComponent } from './components/article-comment-item/article-comment-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ArticlesListComponent,
    ArticleComponent,
    ArticleDetailsComponent,
    ArticlesComponent,
    PaginationComponent,
    ArticleCommentsComponent,
    ArticleCommentsFormComponent,
    ArticleCommentItemComponent]
})
export class RedditModule { }
