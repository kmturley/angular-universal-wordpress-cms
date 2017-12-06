import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-page',
  template: `<h3>Page</h3>
  <a class="post" routerLink="{{ post.link.slice(root.length) }}" *ngFor="let post of posts">
    <h3>{{ post.title.rendered }}</h3>
    <p [innerHTML]="post.content.rendered"></p>
  </a>`,
  styles: []
})
export class PageComponent implements OnInit {
  private root = 'http://localhost:8080';
  private url = '/wp-json/wp/v2/posts';
  public posts:Array<any>;

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.http.get(this.root + this.url).subscribe(res => {
      this.posts = res.json();
    });
  }

}
