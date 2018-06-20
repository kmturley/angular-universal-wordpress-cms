import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { first, tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

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
    console.log('transferState', this.transferState['store']['posts']);
    if (this.transferState.hasKey(key)) {
      const item = this.transferState.get(key, null);
      console.log(id, 'transferState', item);
      // this.transferState.remove(key);
      return of(item);
    } else {
      return this.http.get(url).pipe(
        map(items => {
          console.log(id, 'http', items);
          if (items['id']) {
            items = new Page(items);
          } else {
            Object.keys(items).forEach(item => {
              items[item] = new Page(items[item]);
            });
          }
          // console.log(id, items);
          this.transferState.set(key, items);
          return items;
        })
      );
    }
  }
}
