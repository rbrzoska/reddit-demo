import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { ArticleEffects } from './article.effects';

describe('ArticleService', () => {
  let actions$: Observable<any>;
  let effects: ArticleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ArticleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});