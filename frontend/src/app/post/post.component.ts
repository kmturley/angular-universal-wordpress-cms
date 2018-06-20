import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ApiService } from '../shared/api.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-post',
  template: `
    <div *ngIf="post">
      <h3>{{ post.title.rendered }}</h3>
      <p [innerHTML]="post.content.rendered"></p>
    </div>
  `,
  styles: []
})
export class PostComponent implements OnInit {
  private url = '/wp-json/wp/v2/posts?slug=';
  public post: object;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.api.get(environment.url + this.url + params['id'], params['id']).subscribe(res => {
          this.post = res[0];
        });
      }
    });
  }
}
