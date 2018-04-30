import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/Article';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/Page';
import { RedditAnimations } from '../../../core/reddit-animations';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [
    RedditAnimations.slideAnimation
  ]
})
export class ArticlesComponent implements OnInit {

  animationTrigger: object;
  articles: Page<Article>;

  constructor(private route: ActivatedRoute) {
    this.animationTrigger = {
      value: 'slide',
      params: {
        offsetEnter: this.route.snapshot.params['direction'] === 'before' ? 100 : -100,
        offsetLeave: this.route.snapshot.params['direction'] === 'before' ? -100 : 100
      }
    };
  }

  ngOnInit() {
    this.articles = this.route.snapshot.data.articles;
  }
}
