const request = require('request');

const root = 'http://localhost:8080';
const routes = ['/'];

/*
 * Wordpress API
 * Need to find a better way of getting all pages, categories and posts
 * Maybe use the sitemap functionality which should list all pages in the site
 */

function addPaths(items) {
  items.forEach(item => {
    let path = item.link.slice(root.length + 1, -1);
    if (path.startsWith('./')) {
      path = path.slice(2);
    }
    routes.push('/' + path);
  });
}

export function getPaths() {
  return new Promise(function (resolve, reject) {
    request(root + '/wp-json/wp/v2/pages', { json: true }, (err, res, pages) => {
      if (err) return reject(err);
      addPaths(pages);
      request(root + '/wp-json/wp/v2/categories', { json: true }, (err, res, categories) => {
        if (err) return reject(err);
        addPaths(categories);
        request(root + '/wp-json/wp/v2/posts', { json: true }, (err, res, posts) => {
          if (err) return reject(err);
          addPaths(posts);
          resolve(routes);
        });
      });
    });
  })
}
