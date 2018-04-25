import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Article } from '../../../models/Article';
import { ArticleActions, ArticleActionTypes } from '../actions/article.actions';

export interface ArticlesState {
  articlesList: Article[];
  isFirstPage: boolean;
  pending: boolean;
}

export const initialState: ArticlesState = {
  articlesList: [],
  isFirstPage: false,
  pending: false
};

export const metaReducers: MetaReducer<ArticlesState>[] = !environment.production ? [] : [];

export function reducer(
  state: ArticlesState = initialState,
  action: ArticleActions
): ArticlesState {
  switch (action.type) {
    case ArticleActionTypes.LoadArticlesListSuccessAction:
      return {
        articlesList: action.payload,
        isFirstPage: true,
        pending: false
      };

    default:
      return state;
  }
}

export const getArticlesListLoadPending = (state: ArticlesState) => state.pending;
export const getIsFirstPage = (state: ArticlesState) => state.isFirstPage;

export const getArticleState = createFeatureSelector<ArticlesState>('reddit');
export const getArticlesListState = createSelector(
  getArticleState,
  state => state.articlesList
);
