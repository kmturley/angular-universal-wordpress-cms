import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
  ) { }

  addRoutes(items) {
    items.forEach(route => {
      let path = route.link.slice(this.root.length + 1, -1);
      let type = route.type ? route.type : route.taxonomy
      if (path.startsWith('./')) {
        path = path.slice(2);
      }
      this.routes.push({
          pathMatch: 'full',
          path: path,
          loadChildren: './' + type + '/' + type + '.module#' + type.charAt(0).toUpperCase() + type.slice(1) + 'Module',
          data: {
            title: route.title ? route.title.rendered : route.name,
            type: type
          }
      });
    });
  }

  getRoutes() {
    return new Promise((resolve, reject) => {
      this.http.get(this.root + '/wp-json/wp/v2/pages')
        .toPromise()
        .then(res => {
          this.addRoutes(res);
          this.http.get(this.root + '/wp-json/wp/v2/categories')
            .toPromise()
            .then(res2 => {
              this.addRoutes(res2);
              this.http.get(this.root + '/wp-json/wp/v2/posts')
                .toPromise()
                .then(res3 => {
                  this.addRoutes(res3);
                  resolve(this.routes);
                }, reject);
            }, reject);
        }, reject);
    });
  }
}
