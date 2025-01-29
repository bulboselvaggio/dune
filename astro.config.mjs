import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import react from '@astrojs/react';

export default defineConfig({
  site: "https://dune70.com",
  integrations: [
    tailwind(),
    compress(),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
});
