import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;
    return { url, params, queryParams };
  }
}

export const getRouterState = createFeatureSelector<RouterStateUrl>('router');
export const getRouteParamsState = createSelector(
  getRouterState,
  state => {
    return state.state.params;
  }
);
