import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind(), react()],
  site: 'https://pameproj.github.io',
  base: '/PAME',
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});