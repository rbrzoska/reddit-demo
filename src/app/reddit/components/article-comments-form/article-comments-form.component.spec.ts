import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentsFormComponent } from './article-comments-form.component';

describe('ArticleCommentsFormComponent', () => {
  let component: ArticleCommentsFormComponent;
  let fixture: ComponentFixture<ArticleCommentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCommentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
