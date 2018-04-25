import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadArticlesList } from '../../store/actions/article.actions';
import { Article } from '../../../models/Article';
import { select, Store } from '@ngrx/store';
import * as fromReddit from '../../store/reducers';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<Article[]>;

  constructor(private store: Store<fromReddit.ArticlesState>) {
    this.articles$ = store.pipe(select(fromReddit.getArticlesListState));
  }

  ngOnInit() {
    this.store.dispatch(new LoadArticlesList({
      pageSize: 10
    }));
  }
}
