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
<<<<<<< HEAD
  integrations: [tailwind(), react()],
=======
  integrations: [tailwind(), react(), db()],
  site: 'https://pameproj.github.io',
  base: '/PAME',
  output: "server",
  adapter: vercel(),
>>>>>>> 48207568d33804e4e2ee43d468de569d6a85aad9
});