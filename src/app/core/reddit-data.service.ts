import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Article, ArticlePreview } from '../models/Article';
import { Page } from '../models/Page';
import { Comment, CommentsMap } from '../models/Comment';
import { isEmpty } from 'lodash';

const redditApiUrl = 'https://www.reddit.com';

@Injectable()
export class RedditDataService {

  private count: number;
  private commentsMap: CommentsMap = {};

  constructor(private http: HttpClient) { }

  getArticlesList(pageSize: number = 10, pageId: string = '', direction: string = ''): Observable<Page<Article>> {

    this.count = this.getCountNumber(this.count, direction, pageSize, pageId);
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('count', this.count.toString())
      .set(direction, pageId);

    return this.http.get(redditApiUrl + '/r/popular/.json', { params })
      .pipe(
        map((r: any) => {
          return {
            previousPageId: r.data.before,
            nextPageId: r.data.after,
            items: this.mapArticleObject(r)
          };
        })
      );
  }

  getArticleById(articleId: string): Observable<Article> {
    return this.http.get(redditApiUrl + `/by_id/${articleId}/.json`)
      .pipe(
        map((r: any) => {
          return this.mapArticleObject(r)[0];
        })
      );
  }

  getArticleComments(subredditId: string, articleShortId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(redditApiUrl + `/r/${subredditId}/comments/${articleShortId}/.json`)
      .pipe(
        map( x => x.sort((a, b) => b.id - a.id))
      );
  }

  addArticleComment(articleId: string, commentText: string): Observable<any> {
    return this.http.post(redditApiUrl + `/api/comment`, {
      text: commentText,
      parent: articleId
    });
  }

  getMockedComments(articleShortId: string): Comment[] {
    return this.commentsMap[articleShortId] || [];
  }

  postMockedComments(articleShortId: string, text: string) {
    let articleComments = this.commentsMap[articleShortId];
    if (!articleComments) {
      articleComments = this.commentsMap[articleShortId] = [];
    }
    articleComments.push({
      id: articleComments.length,
      text: text
    });
  }

  private getCountNumber(currentCount: number, direction: string, pageSize: number, pageId): number {
    let newCount;
    if (currentCount === undefined || pageId === '') {
      if (direction === '') {
        newCount = 0;
      } else {
        newCount = pageSize + 1;
      }
    } else {
      if (direction === 'after') {
        if (currentCount === 0) {
          newCount = pageSize + 1;
        } else if (currentCount % pageSize === 1) {
          newCount = currentCount === pageSize + 1 ? currentCount + pageSize - 1 :  currentCount - 1;
        } else if (currentCount && currentCount % pageSize === 0) {
          newCount = currentCount + pageSize;
        }
      } else if (direction === 'before') {
        if (currentCount % pageSize === 0) {
          newCount = currentCount + 1;
        } else if (currentCount % pageSize === 1) {
          newCount = currentCount - pageSize;
        }
      }
    }
    return newCount;
  }

  private mapArticleObject(obj): Article[] {
    return obj.data.children.map(x =>  {
      return {
        title: x.data.title,
        id: x.data.name,
        shortId: x.data.id,
        thumbnail: this.thumbWithFallback(x.data.thumbnail),
        url: x.data.url,
        redditLink: x.data.permalink,
        preview: this.parsePreview(x.data.preview, x.data.selftext),
        commentsCount: x.data.num_comments
      };
    });
  }

  private thumbWithFallback(thumbnailUrl: string): string {
    const unexpectedThumbsUrls = ['image', 'default', 'self', 'nsfw', 'spoiler'];
    return unexpectedThumbsUrls.includes(thumbnailUrl) ? '/assets/avatar.jpg' : thumbnailUrl;
  }

  private parsePreview(preview: any = {}, selfText): ArticlePreview {
    let type;
    let url;
    let data: string = null;

    if (preview.images && preview.images.length) {
      if (!isEmpty(preview.images[0].variants)) {
        if (preview.images[0].variants.hasOwnProperty('gif')) {
          type = 'gif';
          url = preview.images[0].variants.gif.source.url;
        }
      } else {
        type = 'image';
        url = preview.images[0].source.url;
      }
    } else {
      type = 'text';
    }
    if (selfText) {
      data = selfText;
    }

    return {
      type, url, data
    };
  }

}
