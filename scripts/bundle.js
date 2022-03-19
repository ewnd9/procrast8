'use strict';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const esbuild = require('esbuild');
const path = require('path');

const rootDir = path.resolve(`${__dirname}/..`);

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  await esbuild.build({
    entryPoints: [`${rootDir}/src/options.js`],
    outfile: `${rootDir}/dist/options.js`,
    bundle: true,
    sourcemap: true,
    minify: false,
    platform: 'browser',
    define: {
      'process.env.NODE_DEBUG': 'false',
    },
  });
}
