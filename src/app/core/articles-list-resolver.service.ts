import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Article } from '../models/Article';
import { Observable } from 'rxjs/Observable';
import { RedditDataService } from './reddit-data.service';
import { Page } from '../models/Page';

@Injectable()
export class ArticlesListResolverService implements Resolve<Page<Article>> {

  constructor(private reddit: RedditDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<Article>> {
    return this.reddit.getArticlesList(10, route.params['pageId'], route.params['direction']);
  }

}
