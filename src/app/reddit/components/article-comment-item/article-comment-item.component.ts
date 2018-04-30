import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-comment-item',
  templateUrl: './article-comment-item.component.html',
  styleUrls: ['./article-comment-item.component.scss']
})
export class ArticleCommentItemComponent implements OnInit {

  @Input() comment: Comment;
  constructor() { }

  ngOnInit() {
  }

}
