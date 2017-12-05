import { NgModule, Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'; // It is for the json pipe
import { Router, RouterModule } from '@angular/router'
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppRoutingService } from '../app-routing.service';

@Component({
  selector: 'lazy-view',
  template: `<h3>Lazy</h3>
  <a class="post" routerLink="{{ post.link.slice(root.length) }}" *ngFor="let post of posts">
    <h3>{{ post.title.rendered }}</h3>
    <p [innerHTML]="post.content.rendered"></p>
  </a>`
})
export class LazyComponent implements OnInit {
  private root = 'http://localhost:8080';
  private url = 'http://localhost:8080/wp-json/wp/v2/posts';
  public posts:Array<any>;

  constructor(
    private http: Http,
    private router: Router,
    private routeService: AppRoutingService
  ) { }

  ngOnInit() {
    this.http.get(this.url).subscribe(res => {
      this.posts = res.json();
      const routerConfig = this.router.config;
      this.posts.forEach(route => {
          routerConfig.push({
              pathMatch: 'full',
              path: route.link.slice(this.root.length + 1, -1),
              loadChildren: './lazy/lazy.module#LazyModule'
          });
      });
      console.log('getRoutes', routerConfig);
      this.router.resetConfig(routerConfig);
    });
  }
}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full'}
    ])
  ]
})
export class LazyModule {

}