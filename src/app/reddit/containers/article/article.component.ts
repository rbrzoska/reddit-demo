import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../store/reducers';
import * as fromReddit from '../../store/reducers';
import { Params } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  params$: Observable<Params>;

  constructor(private store: Store<fromRoot.State>,
              private redditStore: Store<fromReddit.ArticlesState>) {
    this.params$ = store.pipe(
      select(fromRoot.getRouteParamsState));
  }

  ngOnInit() {
  }

}
