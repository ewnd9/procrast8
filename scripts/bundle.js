'use strict';

const fs = require('fs');
const browserify = require('browserify');

browserify(__dirname + '/../src/options.js')
  .transform('babelify', { presets: ['stage-0'] } )
  .transform('csjs-injectify')
  .bundle()
  .pipe(fs.createWriteStream(__dirname + '/../dist/options.js'));
