# Yohan Wickramasinghe, portfolio

Astro + React + Motion + lucide icons. Static output, deployed on Vercel.

## Deploy on Vercel
1. Vercel > Add New > Project > import this repo. Astro is detected automatically (build `npm run build`, output `dist`).
2. Contact form: create a free access key at web3forms.com using your email, then add it in Vercel > Settings > Environment Variables as `PUBLIC_WEB3FORMS_KEY` and redeploy. Until it is set, the form opens the visitor's email app instead.
3. Once the final domain is connected, set `SITE_URL` (for example `https://yourdomain.com`) so the sitemap and canonical links use it, and update the Sitemap line in `public/robots.txt`.
