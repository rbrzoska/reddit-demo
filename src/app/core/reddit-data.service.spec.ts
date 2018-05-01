import { TestBed } from '@angular/core/testing';

import { RedditDataService } from './reddit-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('RedditDataService', () => {
  let redditService: RedditDataService;
  let http: HttpClient;
  let backend: HttpTestingController;
  const pageSize = 10;
  const pageId = 'testId';
  let direction = 'after';
  const category = 'best';

  const testResponse = {
    data: {
      children: [
        {
          kind: 't3',
          data: {
            title: 'testTitle',
            id: 't3_123456',
            shortId: '123456',
            thumbnail: 'testthumb',
            url: 'testurl',
            redditLink: 'testpermalink',
            preview: {},
            commentsCount: 100
          }
        }
      ]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RedditDataService]
    });
    http = TestBed.get(HttpClient);
    backend = TestBed.get(HttpTestingController);
    redditService = TestBed.get(RedditDataService);
  });

  it('should send proper default articles GET request', () => {
    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();

    const mock = backend.expectOne(req =>
      req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
      req.method === 'GET');
    expect(mock.request.params.get('count')).toBe('0');
    expect(mock.request.params.get('limit')).toBe('10');
  });

  it('should send proper parametrized articles GET request', () => {
    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();

    const mock = backend.expectOne(req =>
      req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
      req.method === 'GET');
    expect(mock.request.params.get('count')).toBe('11');
    expect(mock.request.params.get('limit')).toBe('10');
    expect(mock.request.params.get(direction)).toBe(pageId);
  });

  it('should send proper count and direction parameters for next and previous pages GET requests', () => {
    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();

    let mock = backend.expectOne(req =>
      req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
      req.method === 'GET');
    mock.flush(testResponse);

    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();
    mock = backend.expectOne(req => {
      return req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
      req.method === 'GET'; });
    expect(mock.request.params.get('count')).toBe('20');
    expect(mock.request.params.get(direction)).toBe(pageId);
    mock.flush(testResponse);

    direction = 'before';
    redditService.getArticlesList(pageSize, pageId, direction, category).subscribe();
    mock = backend.expectOne(req => {
      return req.url.includes(`https://www.reddit.com/r/${category}/.json`) &&
        req.method === 'GET'; });
    expect(mock.request.params.get('count')).toBe('21');
    expect(mock.request.params.get(direction)).toBe(pageId);
  });
});
