const request = require('request');

const root = 'http://localhost:8080';

/*
 * Wordpress API
 * Need to find a better way of getting all pages, categories and posts
 * Maybe use the sitemap functionality which should list all pages in the site
 */

export function getPaths() {
  return new Promise(function (resolve, reject) {
    const routes = ['/'];
    request(root + '/wp-json/wp/v2/pages', { json: true }, (err, res, items) => {
      if (err) return reject(err);
      items.forEach(item => {
        routes.push(item.link.slice(root.length, -1));
      });
      // request(root + '/wp-json/wp/v2/categories', { json: true }, (err, res, items) => {
      //   if (err) return reject(err);
      //   items.forEach(item => {
      //     routes.push(item.link.slice(root.length, -1));
      //   });
        request(root + '/wp-json/wp/v2/posts', { json: true }, (err, res, items) => {
          if (err) return reject(err);
          items.forEach(item => {
            routes.push(item.link.slice(root.length, -1));
          });
          resolve(routes);
        });
      // });
    });
  })
}
