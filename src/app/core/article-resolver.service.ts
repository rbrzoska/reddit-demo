import { Injectable } from '@angular/core';
import { RedditDataService } from './reddit-data.service';
import { Observable } from 'rxjs/Observable';
import { Article } from '../models/Article';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ArticleResolverService implements Resolve<Article> {

  constructor(private reddit: RedditDataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    return this.reddit.getArticleById(route.params['id']).pipe(
      catchError(() => {
        this.router.navigateByUrl('/404');
        return of(null);
      })
    );
  }

}
