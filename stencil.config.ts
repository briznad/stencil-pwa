import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import * as autoprefixer from 'autoprefixer';

// https://stenciljs.com/docs/config

export const config : Config = {
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()]
    })
  ],
  outputTargets : [
    {
      type : 'www',
      dir : 'docs',
      serviceWorker : {
        swSrc: 'src/sw.js'
      }
    }
  ],
  globalScript : 'src/global/app.ts',
  globalStyle : 'src/global/app.css'
};
