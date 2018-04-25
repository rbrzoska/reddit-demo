import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedditRoutingModule } from './reddit-routing.module';
import { ArticleComponent } from './containers/article/article.component';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticlesComponent } from './containers/articles/articles.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromReddit from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './store/effects/article.effects';

@NgModule({
  imports: [
    CommonModule,
    RedditRoutingModule,
    EffectsModule.forFeature([ArticleEffects]),
    StoreModule.forFeature('reddit', fromReddit.reducer, { metaReducers: fromReddit.metaReducers })
  ],
  declarations: [
    ArticlesListComponent,
    ArticleComponent,
    ArticleListItemComponent,
    ArticleDetailsComponent,
    ArticlesComponent]
})
export class RedditModule { }
