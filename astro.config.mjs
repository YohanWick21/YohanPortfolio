import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// Netlify sets URL at build time to the live site address.
export default defineConfig({
  site: process.env.URL || 'https://yohanwickramasinghe.netlify.app',
  integrations: [react(), sitemap({ filter: (p) => !p.includes('/thanks/') })],
  vite: { ssr: { noExternal: ['lucide-react', 'motion'] } },
  build: { format: 'directory' }, trailingSlash: 'always',
});
