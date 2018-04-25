import { Component, OnInit } from '@angular/core';
import { RedditDataService } from '../../../core/reddit-data.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  constructor(private reddit: RedditDataService) {
    reddit.getArticlesList();

  }

  ngOnInit() {
  }

}
