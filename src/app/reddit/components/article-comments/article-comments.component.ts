import { Component, Input, OnInit } from '@angular/core';
import { RedditDataService } from '../../../core/reddit-data.service';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../../../models/Comment';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit {

  comments$: Observable<Comment[]>;

  @Input() articleShortId: string;

  constructor(private reddit: RedditDataService) {
  }

  ngOnInit() {
    this.comments$ = this.reddit.getArticleComments(null, this.articleShortId);
  }

  handleSendComment(text) {
    this.reddit.addArticleComment(this.articleShortId, text)
      .subscribe(() => this.comments$ = this.reddit.getArticleComments(null, this.articleShortId));
  }

}
