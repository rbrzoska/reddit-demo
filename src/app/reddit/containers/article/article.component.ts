import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../../../models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articleDetails: Article;

  constructor(private route: ActivatedRoute,
              private location: Location) {
    this.route.params.subscribe(() => {
      this.articleDetails = route.snapshot.data.article;
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
