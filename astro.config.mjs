import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [tailwind(), react(), db()],
  site: 'https://pameproj.github.io',
  base: '/PAME',
  output: "server",
  adapter: vercel(),
});