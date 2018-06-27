// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';

import {enableProdMode} from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {renderModuleFactory} from './utils';
import {getPaths} from './static.paths';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const BROWSER_FOLDER = join(process.cwd(), 'browser');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();


getPaths().then((ROUTES: any[]) => {
  console.log('ROUTES', ROUTES);

  // create json folder
  const jsonPath = join(BROWSER_FOLDER, 'json');
  if (!existsSync(jsonPath)) {
    mkdirSync(jsonPath);
  }

  // Iterate each route path
  ROUTES.forEach(route => {
    const fullPath = join(BROWSER_FOLDER, route);

    // Make sure the directory structure is there
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath);
    }

    // Writes rendered HTML to index.html, replacing the file if it already exists.
    previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    })).then((data: { output: string, document: object }) => {
      // write html file
      writeFileSync(join(fullPath, 'index.html'), data.output);

      // write json files from TransferState objects
      const json = JSON.parse(unescapeHtml(data.document['byId']['my-app-state']['_firstChild']['_data']));
      Object.keys(json).forEach(item => {
        writeFileSync(join(jsonPath, item + '.json'), JSON.stringify(json[item]));
      });
    });
  });
});

export function unescapeHtml(text: string): string {
  const escapedText: {[k: string]: string} = {
    '&a;': '&',
    '&q;': '"',
    '&s;': '\'',
    '&l;': '<',
    '&g;': '>',
  };
  return text.replace(/(&a;)|(&q;)|(&s;)|(&l;)|(&g;)/g, s => escapedText[s]);
}
