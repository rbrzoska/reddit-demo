import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Article } from '../models/Article';

const redditApiUrl = '';

@Injectable()
export class RedditDataService {

  constructor(private http: HttpClient) { }

  getArticlesList(pageSize: number = 10, after: string = '', before: string = '' ): Observable<Article[]> {
    let params = new HttpParams()
      .set('limit', pageSize.toString());
    if (after) {
      params = params.append('after', after);
    }
    if (before) {
      params = params.append('before', before);
    }
    return this.http.get('https://www.reddit.com/new/.json', { params })
      .pipe(
        map((r: any) => {
          return r.data.children.map(x =>  {
            return {
              title: x.data.title,
              id: x.data.name,
              thumbnail: x.data.thumbnail,
              html: x.data.selftext,
              url: x.data.url,
              preview: x.data.preview
            };
          });
        })
      );
  }
  getArticleById() {
    this.http.get('https://www.reddit.com/by_id/t3_8eq9fi/.json')
      .pipe(
        map((r: any) => {
          return {
            title: r.title,
            id: r.id,
            thumbnail: r.thumbnail,
            html: r.selftext,
            url: r.url,
            preview: r.preview
          };
        })
      ).subscribe(x => {
      console.log(x);
    });
  }

}
