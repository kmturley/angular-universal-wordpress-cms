const rp = require('request-promise');

import { environment } from './src/environments/environment.prod';
const routes = ['/'];

/*
 * Wordpress API
 * Need to find a better way of getting all pages, categories and posts
 * Maybe use the sitemap functionality which should list all pages in the site
 */

function addPaths(items) {
  items.forEach(item => {
    let path = item.link.slice(environment.url.length + 1, -1);
    if (path.startsWith('./')) {
      path = path.slice(2);
    }
    routes.push('/' + path);
  });
}

export function getPaths() {
  return Promise.all([
    rp({uri: environment.url + '/wp-json/wp/v2/pages', json: true}),
    rp({uri: environment.url + '/wp-json/wp/v2/categories', json: true}),
    rp({uri: environment.url + '/wp-json/wp/v2/posts', json: true})
  ]).then((values) => {
    values.forEach((value) => {
      addPaths(value);
    });
    return routes;
  });
}
