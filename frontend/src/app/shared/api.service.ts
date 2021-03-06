import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { first, tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

class Page {
  acf: object;
  content: object;
  link: string;
  slug: string;
  taxonomy: string;
  title: string;
  type: string;

  constructor(data: {
    acf?: object,
    content?: object,
    link?: string,
    slug?: string,
    taxonomy?: string,
    title?: string,
    type?: string
  }) {
    if (data.acf) { this.acf = data.acf; }
    if (data.content) { this.content = data.content; }
    if (data.link) { this.link = data.link; }
    if (data.slug) { this.slug = data.slug; }
    if (data.taxonomy) { this.taxonomy = data.taxonomy; }
    if (data.title) { this.title = data.title; }
    if (data.type) { this.type = data.type; }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) { }

  get(url, id): Observable<any> {
    const key = makeStateKey(id);
    if (this.transferState.hasKey(key)) {
      const item = this.transferState.get(key, null);
      return of(item);
    } else {
      if (environment.production && isPlatformBrowser(this.platformId)) {
        url = `./json/${id}.json`;
      }
      console.log('get', url);
      return this.http.get(url).pipe(
        map(items => {
          if (items['id']) {
            items = new Page(items);
          } else {
            Object.keys(items).forEach(item => {
              items[item] = new Page(items[item]);
            });
          }
          this.transferState.set(key, items);
          return items;
        })
      );
    }
  }
}
