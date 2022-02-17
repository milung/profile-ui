import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'profile-ui',
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
