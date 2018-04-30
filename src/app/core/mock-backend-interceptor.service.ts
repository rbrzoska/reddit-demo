import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RedditDataService } from './reddit-data.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MockBackendInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqArray = request.url.split('/');
    if (reqArray[5] === 'comments' && request.method === 'GET') {
      if (reqArray[4] && reqArray[6]) {
        return of(new HttpResponse({ status: 200, body: this.reddit.getMockedComments(reqArray[6])}));
      } else {
        return Observable.throw('Bad comments get request');
      }
    }
    if (request.url.includes('api/comment') && request.method === 'POST') {
      if (request.body && request.body.text && request.body.parent) {
        this.reddit.postMockedComments(request.body.parent, request.body.text);
        return of(new HttpResponse({ status: 200 }));
      } else {
        return Observable.throw('Bad comments post request');
      }
    }
    return next.handle(request);
  }

  constructor(private reddit: RedditDataService) { }

}
