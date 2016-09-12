'use strict';

process.env.NODE_ENV = 'production';

const fs = require('fs');
const Browserify = require('browserify');

const main = __dirname + '/../src/options.js';
const destSrc = __dirname + '/../dist/options.js';
const destMap = __dirname + '/../dist/options.js.map';
const destDisc = __dirname + '/disc.html';

const bundler = new Browserify({ debug: true, entries: [main] });

bundler
  .transform('yo-yoify', { global: true })
  .transform('babelify', { presets: ['stage-0'] } )
  .transform('envify', { global: true })
  .transform('csjs-injectify')
  .transform('unassertify', { global: true })
  .plugin('minifyify', { map: destMap });

bundler.bundle(function (err, src, map) {
  if (err) {
    console.error('error loading ', mainfile);
  } else {
    fs.writeFile(destSrc, src);
    fs.writeFile(destMap, map);
  }
});
