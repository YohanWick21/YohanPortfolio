# Yohan Wickramasinghe, portfolio

Astro + React + Motion + lucide icons. Static output, deployed on Netlify.

## Deploy as a second Netlify site
1. Netlify > Add new site > Import from GitHub > pick this repo.
2. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. Contact form uses Netlify Forms (form name `brief`). Turn on notifications under Site settings > Forms.

## Where things live
- `src/data/site.ts`: homepage queue copy (JOBS, marked DRAFT), project data, blog list, About.
- `src/components/Machine.tsx`: the idea-to-published press.
- `src/pages/`: one file per page. `src/styles/site.css` base, `fun.css` colour and motion layer.
- `public/assets/`: optimised images and the CV.

Local: `npm install`, `npm run dev`.
