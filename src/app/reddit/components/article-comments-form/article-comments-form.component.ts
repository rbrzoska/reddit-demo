import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-comments-form',
  templateUrl: './article-comments-form.component.html',
  styleUrls: ['./article-comments-form.component.scss']
})
export class ArticleCommentsFormComponent implements OnInit {

  commentForm: FormGroup;
  @Output() sendComment = new EventEmitter<string>();

  constructor() {
    this.commentForm = new FormGroup({
      comment: new FormControl('', {
        validators: [Validators.minLength(10), Validators.maxLength(100)],
        updateOn: 'submit'
      })
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.commentForm.valid) {
      this.sendComment.emit(this.commentForm.controls['comment'].value);
      this.commentForm.reset();
    }
  }
}
