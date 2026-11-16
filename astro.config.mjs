import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// Netlify sets URL at build time to the live site address.
export default defineConfig({
  site: process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://yohanwickramasinghe.vercel.app'),
  integrations: [react(), sitemap({ filter: (p) => !p.includes('/thanks/') })],
  vite: { ssr: { noExternal: ['lucide-react', 'motion'] } },
  build: { format: 'directory' }, trailingSlash: 'always',
});
