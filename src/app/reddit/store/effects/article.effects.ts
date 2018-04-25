import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ArticleActionTypes, LoadArticlesList, LoadArticlesListFail, LoadArticlesListSuccess } from '../actions/article.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RedditDataService } from '../../../core/reddit-data.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ArticleEffects {

  constructor(private actions$: Actions, private redditService: RedditDataService) {}

  @Effect()
  loadArticlesList$: Observable<Action> = this.actions$.pipe(
    ofType<LoadArticlesList>(ArticleActionTypes.LoadArticlesListAction),
    switchMap((action) =>
      this.redditService.getArticlesList(action.payload.pageSize, action.payload.after, action.payload.before)
        .pipe(
          map(articles => new LoadArticlesListSuccess(articles)),
          catchError(() => of(new LoadArticlesListFail()))
        )
    )
  );
}
