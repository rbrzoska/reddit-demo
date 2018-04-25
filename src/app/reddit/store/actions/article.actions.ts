import { Action } from '@ngrx/store';
import { Article } from '../../../models/Article';

export enum ArticleActionTypes {
  LoadArticlesListAction = '[Articles List] Load',
  LoadArticlesListSuccessAction = '[Articles List] Load Success',
  LoadArticlesListFailAction = '[Articles List] Load Fail'
}

export class LoadArticlesList implements Action {
  readonly type = ArticleActionTypes.LoadArticlesListAction;
  constructor(public payload: { pageSize: number, after?: string, before?: string }) {}
}

export class LoadArticlesListSuccess implements Action {
  readonly type = ArticleActionTypes.LoadArticlesListSuccessAction;
  constructor(public payload: Article[]) {}
}

export class LoadArticlesListFail implements Action {
  readonly type = ArticleActionTypes.LoadArticlesListFailAction;
}

export type ArticleActions = LoadArticlesList | LoadArticlesListSuccess | LoadArticlesListFail;
