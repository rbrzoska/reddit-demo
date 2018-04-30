import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../models/Article';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  @Input() details: Article;
  constructor() { }

  ngOnInit() {

  }

}
