import { TestBed, inject } from '@angular/core/testing';

import { RedditDataService } from './reddit-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpRequest } from '@angular/common/http';

describe('RedditDataService', () => {
  let redditService: RedditDataService;
  let http: HttpClient;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RedditDataService
        ]
    });
    http = TestBed.get(HttpClient);
    backend = TestBed.get(HttpTestingController);
    redditService = TestBed.get(RedditDataService);
  });

  it('should send proper default articles GET request', () => {
    const pageSize = 10;
    const pageId = '';
    const direction = '';
    const category = 'best';
    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();

    const mock = backend.expectOne(req =>
      req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
      req.method === 'GET');
    expect(mock.request.params.get('count')).toBe('0');
    expect(mock.request.params.get('limit')).toBe('10');
  });

  it('should send proper parametrized articles GET request', () => {
    const pageSize = 10;
    const pageId = 'testId';
    const direction = 'after';
    const category = 'best';
    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();

    const mock = backend.expectOne(req =>
      req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
      req.method === 'GET');
    expect(mock.request.params.get('count')).toBe('11');
    expect(mock.request.params.get('limit')).toBe('10');
    expect(mock.request.params.get(direction)).toBe(pageId);
  });
});
