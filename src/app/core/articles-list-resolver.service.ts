import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Article } from '../models/Article';
import { Observable } from 'rxjs/Observable';
import { RedditDataService } from './reddit-data.service';
import { Page } from '../models/Page';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ArticlesListResolverService implements Resolve<Page<Article>> {

  constructor(private reddit: RedditDataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<Article>> {
    const category = route.params['category'];
    if (!['best', 'all', 'rising', 'gifs', ''].includes(category)) {
      this.router.navigateByUrl('/404');
      return of(null);
    } else {
      return this.reddit.getArticlesList(
        10,
        route.params['pageId'],
        route.params['direction'],
        route.params['category']);
    }
  }
}
