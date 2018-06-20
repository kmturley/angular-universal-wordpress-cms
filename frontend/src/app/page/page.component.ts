import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-page',
  template: `<h3>Page</h3>
  <a class="post" routerLink="{{ convertUrl(post.link) }}" *ngFor="let post of posts">
    <h3>{{ post.title.rendered }}</h3>
    <p [innerHTML]="post.content.rendered"></p>
  </a>`,
  styles: []
})
export class PageComponent implements OnInit {
  private url = '/wp-json/wp/v2/posts';
  public posts: Array<any>;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.get(environment.url + this.url, 'posts').subscribe(res => {
      this.posts = res as Array<any>;
    });
  }

  convertUrl(url) {
    return url.slice(environment.url.length);
  }

}
