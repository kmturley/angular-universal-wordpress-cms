import { Injectable, NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { Routes } from '@angular/router';
import 'rxjs/add/operator/toPromise';

/*
 * Wordpress API
 * Need to find a better way of getting all pages, categories and posts
 * Maybe use the sitemap functionality which should list all pages in the site
 */

@Injectable()
export class AppRoutingService {
  private root = 'http://localhost:8080';
  public routes: Routes = [];

  constructor(
    private http: Http
  ) { }

  addRoutes(items, inNav) {
    items.forEach(route => {
      let path = route.link.slice(this.root.length + 1, -1);
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      this.routes.push({
          pathMatch: 'full',
          path: path,
          loadChildren: './lazy/lazy.module#LazyModule',
          data: {
            nav: inNav,
            title: route.title ? route.title.rendered : route.name
          }
      });
    });
  }

  getRoutes() {
    return new Promise((resolve, reject) => {
      this.http.get(this.root + '/wp-json/wp/v2/pages')
        .toPromise()
        .then(res => {
          this.addRoutes(res.json(), true);
          this.http.get(this.root + '/wp-json/wp/v2/categories')
            .toPromise()
            .then(res => {
              this.addRoutes(res.json(), false);
              this.http.get(this.root + '/wp-json/wp/v2/posts')
                .toPromise()
                .then(res => {
                  this.addRoutes(res.json(), false);
                  resolve(this.routes);
                }, reject);
            }, reject);
        }, reject);
    });
  }
}
